import { db, admin } from '../config/firebase.js'; 

import type { Instituicao } from '../dtos/instituicao/Instituicao.dto.js';
import type { InstituicaoUpdateInput } from '../dtos/instituicao/InstituicaoUpdateInput.js';
import type { InstituicaoCreateInput } from '../dtos/instituicao/InstituicaoCreateInput.js';

const instituicoesCollection = db.collection('instituicoes');

class InstituicaoRepository {
    
    /* 
    CRUD
    TODO:   ---createInstituicao, getInstituicaoById, getAllInstituicao, updateInstituicaoById, deleteInstituicaoById---
            createInstituicao, getLocalById, getAllLocal, updateLocalById, deleteLocalById
    */ 
    
    async createInstituicao(data: InstituicaoCreateInput): Promise<Instituicao>{

        // retornando instituicao criada com id e timestamp
        const timestamp = admin.firestore.FieldValue.serverTimestamp();

        const dadosParaPersistencia = {
            configuracoes: {},
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

    async getInstituicaoById(id: string): Promise<Instituicao | null> {
        // verificando existencia
        const docSnapshot = await instituicoesCollection.doc(id).get();
        if (!docSnapshot.exists) return null;
        
        // buscando instituicao
        const data = docSnapshot.data() as Omit<Instituicao, 'instituicaoId'>;

        return { 
            instituicaoId: docSnapshot.id,
            ...data 
        } as Instituicao;
    }
    
    async getAllInstituicao(): Promise<Instituicao[]> {
        // verificando existencia
        const querySnapshot = await instituicoesCollection.get();
        if(querySnapshot.empty) {
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
        const timestamp = admin.firestore.FieldValue.serverTimestamp();

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

}

export default new InstituicaoRepository();