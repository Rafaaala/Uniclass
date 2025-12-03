import { db } from '../config/firebase.ts'; 
import { FieldValue } from 'firebase-admin/firestore';
import type { Evento } from '../dtos/evento/Evento.dto.ts';
import type { EventoCreateInput } from '../dtos/evento/EventoCreateInput.ts';
import type { EventoUpdateInput } from '../dtos/evento/EventoUpdateInput.ts';

const eventosCollection = db.collection('eventos');

class EventoRepository {

    // POST: Cria um novo evento
    async createEvento(data: EventoCreateInput): Promise<Evento> {
        const timestamp = FieldValue.serverTimestamp();

        const dadosParaPersistencia = {
            ...data,
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        const docRef = await eventosCollection.add(dadosParaPersistencia);
        const updatedSnapshot = await docRef.get();
        
        if (!updatedSnapshot.exists) {
            throw new Error("Falha ao recuperar documento do evento após a criação.");
        }   

        const dataCompleta = updatedSnapshot.data() as Omit<Evento, 'eventoId'>;

        return {
            eventoId: updatedSnapshot.id,
            ...dataCompleta
        } as Evento;
    }

    // GET: Busca um evento por ID
    async getEventoById(eventoId: string): Promise<Evento | null> {
        const docSnapshot = await eventosCollection.doc(eventoId).get();
        
        if (!docSnapshot.exists) return null;
        
        const data = docSnapshot.data() as Omit<Evento, 'eventoId'>;

        return { 
            eventoId: docSnapshot.id,
            ...data 
        } as Evento;
    }
    
    // GET ALL: Busca todos os eventos de uma INSTITUIÇÃO específica
    async getAllEventosByInstituicao(instituicaoId: string): Promise<Evento[]> {
        const querySnapshot = await eventosCollection
            .where('instituicaoId', '==', instituicaoId)
            .get();

        if (querySnapshot.empty) {
            return [];
        }

        const eventos: Evento[] = querySnapshot.docs.map(doc => {
            const data = doc.data() as Omit<Evento, 'eventoId'>;
            return { eventoId: doc.id, ...data} as Evento;
        });

        return eventos;
    }

    // PATCH: Atualiza campos específicos de um evento
    async updateEventoById(eventoId: string, data: EventoUpdateInput): Promise<Evento | null> {
        const eventoRef = eventosCollection.doc(eventoId);
        const docSnapshot = await eventoRef.get();
        
        if (!docSnapshot.exists) return null;

        const timestamp = FieldValue.serverTimestamp();
        const dadosParaUpdate = {
            ...data,
            updatedAt: timestamp
        };

        await eventoRef.update(dadosParaUpdate);

        const updatedSnapshot = await eventoRef.get();
        const updatedData = updatedSnapshot.data() as Omit<Evento, 'eventoId'>;

        return {
            eventoId: updatedSnapshot.id, ...updatedData
        } as Evento;
    }

    // DELETE: Exclui um evento
    async deleteEventoById(eventoId: string): Promise<boolean> {
        const eventoRef = eventosCollection.doc(eventoId);
        const docSnapshot = await eventoRef.get();
        
        if (!docSnapshot.exists) return false;

        await eventoRef.delete();

        return true;
    }
}

export default new EventoRepository();