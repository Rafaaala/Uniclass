import { Timestamp } from 'firebase-admin/firestore';
import { db, admin } from '../config/firebase.js'; 

import type { Local, Instituicao } from '../dtos/Instituicao.dto.js';
import type { InstituicaoUpdateInput } from '../dtos/InstituicaoUpdateInput.js';

const instituicoesCollection = db.collection('instituicoes');

class InstituicaoRepository {
    
    /* 
    CRUD
    TODO:   ---createInstituicao, findInstituicaoById, findAllInstituicao, updateInstituicaoById, deleteInstituicaoById---
            createInstituicao, findLocalById, findAllLocal, updateLocalById, deleteLocalById
    */ 
    
    async createInstituicao(data: Omit<Instituicao, 'instituicaoId' | 'createdAt' | 'updatedAt'>): Promise<Instituicao>{
        // adicionando nova instituicao ao banco
        const docRef = await instituicoesCollection.add(data);

        // retornando instituicao criada com id e timestamp
        const timestamp = new Date();

        const novaInstituicao: Instituicao = {
            instituicaoId: docRef.id,
            ...data, 
            createdAt: timestamp,
            updatedAt: timestamp,
        } as Instituicao;

        return novaInstituicao;
    }

    async findInstituicaoById(id: string): Promise<Instituicao | null> {
        // verificando existencia
        const docSnapshot = await instituicoesCollection.doc(id).get();
        if (!docSnapshot.exists) return null;

        // buscando instituicao
        const data = docSnapshot.data() as Omit<Instituicao, 'instituicaoId'>;
        return { instituicaoId: docSnapshot.id, ...data } as Instituicao;
    }
    
    async findAllInstituicao(): Promise<Instituicao[]> {
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
        const docSnapshot = await instituicoesCollection.doc(id).get();
        if (!docSnapshot.exists) return false;

        // executando delete da sub colecao LOCAIS
        const locaisRef = instituicaoRef.collection('LOCAIS');
        const locaisSnapshot = await locaisRef.limit(50).get();

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