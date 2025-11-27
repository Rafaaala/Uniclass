import { db } from '../config/firebase.ts'; 
import { FieldValue } from 'firebase-admin/firestore';
import type { Aviso } from '../dtos/aviso/aviso.dto.ts';
import type { AvisoCreateInput } from '../dtos/aviso/AvisoCreateInput.ts';
import type { AvisoUpdateInput } from '../dtos/aviso/AvisoUpdateInput.ts';

const avisosCollection = db.collection('avisos');

class AvisoRepository {

    // POST: Cria um novo aviso
    async createAviso(data: AvisoCreateInput & { instituicaoId: string }): Promise<Aviso> {
        const timestamp = FieldValue.serverTimestamp();

        const dadosParaPersistencia = {
            ...data,
            dataCriacao: timestamp,
        };

        const docRef = await avisosCollection.add(dadosParaPersistencia);
        const updatedSnapshot = await docRef.get();
        
        if (!updatedSnapshot.exists) {
            throw new Error("Falha ao recuperar documento do aviso após a criação.");
        }   

        const dataCompleta = updatedSnapshot.data() as Omit<Aviso, 'avisoId'>;

        return {
            avisoId: updatedSnapshot.id,
            ...dataCompleta
        } as Aviso;
    }

    // GET: Busca um aviso por ID
    async getAvisoById(avisoId: string): Promise<Aviso | null> {
        const docSnapshot = await avisosCollection.doc(avisoId).get();
        
        if (!docSnapshot.exists) return null;
        
        const data = docSnapshot.data() as Omit<Aviso, 'avisoId'>;

        return { 
            avisoId: docSnapshot.id,
            ...data 
        } as Aviso;
    }
    
    // GET ALL: Busca todos os avisos de uma INSTITUIÇÃO específica
    async getAllAvisosByInstituicao(instituicaoId: string): Promise<Aviso[]> {
        const querySnapshot = await avisosCollection
            .where('instituicaoId', '==', instituicaoId)
            // Linha de ordenação removida
            .get();

        if (querySnapshot.empty) {
            return [];
        }

        const avisos: Aviso[] = querySnapshot.docs.map(doc => {
            const data = doc.data() as Omit<Aviso, 'avisoId'>;
            return { avisoId: doc.id, ...data} as Aviso;
        });

        return avisos;
    }

    // PATCH: Atualiza campos específicos de um aviso
    async updateAvisoById(avisoId: string, data: AvisoUpdateInput): Promise<Aviso | null> {
    const avisoRef = avisosCollection.doc(avisoId);
    const docSnapshot = await avisoRef.get();
    
    if (!docSnapshot.exists) return null;
    
    await avisoRef.update(data as Partial<Aviso>); 

    const updatedSnapshot = await avisoRef.get();
    const updatedData = updatedSnapshot.data() as Omit<Aviso, 'avisoId'>;

    return {
        avisoId: updatedSnapshot.id, ...updatedData
    } as Aviso;
}

    // DELETE: Exclui um aviso
    async deleteAvisoById(avisoId: string): Promise<boolean> {
        const avisoRef = avisosCollection.doc(avisoId);
        const docSnapshot = await avisoRef.get();
        
        if (!docSnapshot.exists) return false;

        await avisoRef.delete();

        return true;
    }
}

export default new AvisoRepository();