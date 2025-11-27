import { db } from '../config/firebase.ts'; 

import type { Instituicao, Local } from '../dtos/instituicao/Instituicao.dto.ts';
import type { InstituicaoUpdateInput, LocalUpdateInput } from '../dtos/instituicao/InstituicaoUpdateInput.ts';
import type { InstituicaoCreateInput, LocalCreateInput } from '../dtos/instituicao/InstituicaoCreateInput.ts';
import { FieldValue } from 'firebase-admin/firestore';

const instituicoesCollection = db.collection('instituicoes');

class InstituicaoRepository {
    
    /* 
    CRUD
    TODO:   ---createInstituicao, getInstituicaoById, getAllInstituicao, updateInstituicaoById, deleteInstituicaoById---
            createInstituicao, getLocalById, getAllLocal, updateLocalById, deleteLocalById
    */ 
    

    // INSTITUICAO
    async createInstituicao(data: InstituicaoCreateInput): Promise<Instituicao>{

        const timestamp = FieldValue.serverTimestamp();

        const dadosParaPersistencia = {
            configuracoes: {
                "teste": 1
            },
            ...data,
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        // adicionando a nova instituicao ao banco
        const docRef = await instituicoesCollection.add(dadosParaPersistencia);

        // segunda requisicao para obter o timestamp
        const updatedSnapshot = await docRef.get();
        
        // tratativa de erro caso o banco nao retorne a instituicao recem criada
        if (!updatedSnapshot.exists) {
            throw new Error("Falha ao recuperar documento após a criação.");
        }   

        const dataCompleta = updatedSnapshot.data() as Omit<Instituicao, 'instituicaoId'>;

        return {
            instituicaoId: updatedSnapshot.id,
            ...dataCompleta
        } as Instituicao;
    }

    async getInstituicaoById(id: string): Promise<Instituicao> {
        // verificando existencia
        const docSnapshot = await instituicoesCollection.doc(id).get();
        if (!docSnapshot.exists) {
            throw new Error("Falha ao recuperar documento após a criação.");
        };
        
        // buscando instituicao
        const data = docSnapshot.data() as Omit<Instituicao, 'instituicaoId'>;

        return { 
            instituicaoId: docSnapshot.id,
            ...data 
        } as Instituicao;
    }
    
    async getAllInstituicao(): Promise<Instituicao[]> {
        // verificando se a lista é vazia
        const querySnapshot = await instituicoesCollection.get();
        if(querySnapshot.empty) {
            console.log("Lista vazia")
            return [];
        }

        // buscando todas a instituicoes
        const instituicoes: Instituicao[] = querySnapshot.docs.map(doc => {
            const data = doc.data() as Omit<Instituicao, 'instituicaoId'>;
            return { instituicaoId: doc.id, ...data} as Instituicao;
        });

        return instituicoes;
        
    }

    async updateInstituicaoById(id: string, data: InstituicaoUpdateInput): Promise<Instituicao | null> {

        const instituicaoRef = instituicoesCollection.doc(id);

        // verificando existencia
        const docSnapshot = await instituicaoRef.get();
        if (!docSnapshot.exists) return null;

        // preparando dados para atualizacao
        const timestamp = FieldValue.serverTimestamp();

        const dadosParaUpdate = {
            ...data,
            updatedAt: timestamp
        };

        // executando atualizacao
        await instituicaoRef.update(dadosParaUpdate);

        const updatedSnapshot = await instituicaoRef.get();
        const updatedData = updatedSnapshot.data() as Omit<Instituicao, 'instituicaoId'>;

        return {
            instituicaoId: updatedSnapshot.id, ...updatedData
        } as Instituicao;
    }

    async deleteInstituicaoById(id: string): Promise<boolean>{

        const instituicaoRef = instituicoesCollection.doc(id);

        // verificando existencia
        const docSnapshot = await instituicaoRef.get();
        if (!docSnapshot.exists) return false;

        // executando delete da sub colecao LOCAIS
        const locaisRef = instituicaoRef.collection('LOCAIS');
        const locaisSnapshot = await locaisRef.limit(100).get();

        if (!locaisSnapshot.empty) {
            const batch = db.batch(); 
            locaisSnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }

        // executando delete da instituicao
        await instituicaoRef.delete();

        return true;
    }

    // LOCAL
    async createLocal(instituicaoId: string, data: LocalCreateInput): Promise<Local> {
        
        // verificando existencia da instituicao
        const instituicaoRef = instituicoesCollection.doc(instituicaoId);
        const instituicaoSnapshot = await instituicaoRef.get();

        if (!instituicaoSnapshot.exists) {
            throw new Error(`Instituição com ID ${instituicaoId} não encontrada.`);
        }

        // preparando dados para persistencia
        const locaisRef = instituicoesCollection.doc(instituicaoId).collection('locais');
        const timestamp = FieldValue.serverTimestamp();

        const dadosParaPersistencia = {
            ...data,
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        // adicionando o novo local ao banco
        const docRef = await locaisRef.add(dadosParaPersistencia);

        // segunda requisicao para obter o timestamp
        const updatedSnapshot = await docRef.get();

        // Tratamento de erro
        if (!updatedSnapshot.exists) {
            throw new Error("Falha ao recuperar documento do local após a criação.");
        }   

        const dataCompleta = updatedSnapshot.data() as Omit<Local, 'localId'>;

        return {
            localId: updatedSnapshot.id,
            ...dataCompleta
        } as Local;
    }

    async getLocalById(instituicaoId: string, localId: string): Promise<Local | null>{

        // verificando existencia da instituicao
        const instituicaoRef = instituicoesCollection.doc(instituicaoId);
        const instituicaoSnapshot = await instituicaoRef.get();

        if (!instituicaoSnapshot.exists) {
            throw new Error(`Instituição com ID ${instituicaoId} não encontrada.`);
        }

        // verificando existencia do local
        const localRef = await instituicoesCollection.doc(instituicaoId).collection('locais').doc(localId);
        const docSnapshot = await localRef.get();

        if (!docSnapshot.exists) return null;

        // buscando local
        const data = docSnapshot.data() as Omit<Local, 'localId'>;

        return { 
            localId: docSnapshot.id,
            ...data 
        } as Local
    }
    
    async getAllLocal(instituicaoId: string): Promise<Local[]> {

        // verificando existencia da instituicao
        const instituicaoRef = instituicoesCollection.doc(instituicaoId);
        const instituicaoSnapshot = await instituicaoRef.get();

        if (!instituicaoSnapshot.exists) {
            throw new Error(`Instituição com ID ${instituicaoId} não encontrada.`);
        }

        // verificando se a lista é vazia
        const querySnapshot = await instituicoesCollection.doc(instituicaoId).collection('locais').get();
        
        if(querySnapshot.empty){
            console.log("Lista vazia")
            return [];
        }

        // buscando todos os locais da instituicao
        const locais: Local[] = querySnapshot.docs.map(doc => {
            const data = doc.data() as Omit<Local, 'localId'>;
            return { localId: doc.id, ...data} as Local;
        });

        return locais;
    }

    async updataLocalById(instituicaoId: string, localId: string, data: LocalUpdateInput): Promise<Local | null>{

        // verificando existencia da instituicao
        const instituicaoRef = instituicoesCollection.doc(instituicaoId);
        const instituicaoSnapshot = await instituicaoRef.get();

        if (!instituicaoSnapshot.exists) {
            throw new Error(`Instituição com ID ${instituicaoId} não encontrada.`);
        }

        // verificando existencia do local
        const localRef = await instituicoesCollection.doc(instituicaoId).collection('locais').doc(localId);
        const docSnapshot = await localRef.get(); 

        if (!docSnapshot.exists) return null;

        // preparando dados para atualizacao
        const timestamp = FieldValue.serverTimestamp();

        const dadosParaUpdate = {
            ...data,
            updatedAt: timestamp
        };

        // executando atualizacao
        await localRef.update(dadosParaUpdate);

        const updatedSnapshot = await localRef.get();
        const updatedData = updatedSnapshot.data() as Omit<Local, 'localId'>;

        return {
            localId: updatedSnapshot.id, ...updatedData
        } as Local;


    }

    async deleteLocalById(instituicaoId: string, localId: string): Promise<boolean>{

        // verificando existencia da instituicao
        const instituicaoRef = instituicoesCollection.doc(instituicaoId);
        const instituicaoSnapshot = await instituicaoRef.get();

        if (!instituicaoSnapshot.exists) {
            throw new Error(`Instituição com ID ${instituicaoId} não encontrada.`);
        }

        // verificando existencia do local
        const localRef = await instituicoesCollection.doc(instituicaoId).collection('locais').doc(localId);
        const docSnapshot = await localRef.get();

        if (!docSnapshot.exists) return false;

        // executando delete
        await localRef.delete();

        return true;
    }
}

export default new InstituicaoRepository();