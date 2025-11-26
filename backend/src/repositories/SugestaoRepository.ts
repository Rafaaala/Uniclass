import { db } from '../config/firebase.ts'; 
import { FieldValue, GeoPoint } from 'firebase-admin/firestore';
import type { Sugestao } from '../dtos/sugestao/Sugestao.dto.ts';
import type { SugestaoCreateInput } from '../dtos/sugestao/SugestaoCreateInput.ts';
import type { SugestaoUpdateInput } from '../dtos/sugestao/SugestaoUpdateInput.ts';

const sugestoesCollection = db.collection('sugestoes');

class SugestaoRepository {

    // POST: Cria uma nova sugestão
    async createSugestao(data: SugestaoCreateInput): Promise<Sugestao> {
        const timestamp = FieldValue.serverTimestamp();

        const dadosParaPersistencia = {
            ...data,
            dataCriacao: timestamp,
        };

        const docRef = await sugestoesCollection.add(dadosParaPersistencia);
        const updatedSnapshot = await docRef.get();
        
        if (!updatedSnapshot.exists) {
            throw new Error("Falha ao recuperar documento da sugestão após a criação.");
        }   

        const dataCompleta = updatedSnapshot.data() as Omit<Sugestao, 'sugestaoId'>;

        return {
            sugestaoId: updatedSnapshot.id,
            ...dataCompleta
        } as Sugestao;
    }

    // GET: Busca uma sugestão por ID
    async getSugestaoById(sugestaoId: string): Promise<Sugestao | null> {
        const docSnapshot = await sugestoesCollection.doc(sugestaoId).get();
        
        if (!docSnapshot.exists) return null;
        
        const data = docSnapshot.data() as Omit<Sugestao, 'sugestaoId'>;

        return { 
            sugestaoId: docSnapshot.id,
            ...data 
        } as Sugestao;
    }
    
    // GET ALL: Busca todas as sugestões de uma INSTITUIÇÃO específica
    async getAllSugestoesByInstituicao(instituicaoId: string): Promise<Sugestao[]> {
        const querySnapshot = await sugestoesCollection
            .where('instituicaoId', '==', instituicaoId)
            .get();

        if (querySnapshot.empty) {
            return [];
        }

        const sugestoes: Sugestao[] = querySnapshot.docs.map(doc => {
            const data = doc.data() as Omit<Sugestao, 'sugestaoId'>;
            return { sugestaoId: doc.id, ...data} as Sugestao;
        });

        return sugestoes;
    }

    // PATCH: Atualiza campos específicos de uma sugestão
    async updateSugestaoById(sugestaoId: string, data: SugestaoUpdateInput): Promise<Sugestao | null> {
        const sugestaoRef = sugestoesCollection.doc(sugestaoId);
        const docSnapshot = await sugestaoRef.get();
        
        if (!docSnapshot.exists) return null;

        const dadosParaUpdate = { ...data };

        await sugestaoRef.update(dadosParaUpdate);

        const updatedSnapshot = await sugestaoRef.get();
        const updatedData = updatedSnapshot.data() as Omit<Sugestao, 'sugestaoId'>;

        return {
            sugestaoId: updatedSnapshot.id, ...updatedData
        } as Sugestao;
    }

    // DELETE: Exclui uma sugestão
    async deleteSugestaoById(sugestaoId: string): Promise<boolean> {
        const sugestaoRef = sugestoesCollection.doc(sugestaoId);
        const docSnapshot = await sugestaoRef.get();
        
        if (!docSnapshot.exists) return false;

        await sugestaoRef.delete();

        return true;
    }
}

export default new SugestaoRepository();