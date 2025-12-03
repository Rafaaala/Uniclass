import EventoRepository from '../repositories/EventoRepository.ts';
import InstituicaoRepository from '../repositories/InstituicaoRepository.ts'; 
import CustomError from '../middlewares/CustomError.ts';
import type { Evento } from '../dtos/evento/Evento.dto.ts';
import type { EventoCreateInput } from '../dtos/evento/EventoCreateInput.ts';
import type { EventoUpdateInput } from '../dtos/evento/EventoUpdateInput.ts';
import type { EventoResponse } from '../dtos/evento/EventoResponse.ts';

class EventoService {

    // Helper para verificar a existência do evento E a pertinência à instituição.
    private async checkEventoInstituicao(instituicaoId: string, eventoId: string): Promise<Evento> {
        const evento = await EventoRepository.getEventoById(eventoId);

        if (!evento) {
            throw new CustomError(`Evento com ID ${eventoId} não encontrado.`, 404);
        }
        
        // Regra de Negócio: O evento deve pertencer à Instituição especificada na URL.
        if (evento.instituicaoId !== instituicaoId) {
            throw new CustomError(`O Evento ${eventoId} não pertence à Instituição ${instituicaoId}. Acesso negado.`, 403);
        }

        return evento;
    }
    
    // POST: Cria um novo evento (URL: /instituicoes/:instituicaoId/eventos)
    async createEvento(instituicaoId: string, data: EventoCreateInput): Promise<EventoResponse> {
        
        if (!instituicaoId) throw new CustomError("O ID da instituição é obrigatório na URL.", 400);
        if (!data.titulo) throw new CustomError("O título do evento é obrigatório.", 400);
        if (!data.data) throw new CustomError("A data/horário do evento é obrigatória.", 400);
        if (!data.localId) throw new CustomError("O localId do evento é obrigatório.", 400);
        if (!data.tipo) throw new CustomError("O tipo do evento é obrigatório.", 400);
        
        try {
            await InstituicaoRepository.getInstituicaoById(instituicaoId);
        } catch (error) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        const local = await InstituicaoRepository.getLocalById(instituicaoId, data.localId);
        if (!local) {
            throw new CustomError(`Local com ID ${data.localId} não encontrado na instituição ${instituicaoId}.`, 404);
        }

        const finalData = { ...data, instituicaoId };

        const novoEvento = await EventoRepository.createEvento(finalData);

        return this.mapToResponse(novoEvento);
    }

    // GET: Busca um evento por ID (URL: /instituicoes/:instituicaoId/eventos/:eventoId)
    async getEventoById(instituicaoId: string, eventoId: string): Promise<EventoResponse> {
        
        const evento = await this.checkEventoInstituicao(instituicaoId, eventoId);

        return this.mapToResponse(evento);
    }

    // GET ALL: Busca todos os eventos de uma instituição (URL: /instituicoes/:instituicaoId/eventos)
    async getAllEventos(instituicaoId: string): Promise<EventoResponse[]> {
        
        try {
            await InstituicaoRepository.getInstituicaoById(instituicaoId);
        } catch (error) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        const eventos = await EventoRepository.getAllEventosByInstituicao(instituicaoId);

        if (eventos.length === 0) {
            throw new CustomError("Nenhum evento cadastrado para esta instituição.", 404);
        }

        return eventos.map(e => this.mapToResponse(e));
    }

    // PATCH: Atualiza um evento (URL: /instituicoes/:instituicaoId/eventos/:eventoId)
    async updateEventoById(instituicaoId: string, eventoId: string, data: EventoUpdateInput): Promise<EventoResponse> {
        
        if (Object.keys(data).length === 0) {
            throw new CustomError("Nenhum campo fornecido para atualização.", 400);
        }
        
        await this.checkEventoInstituicao(instituicaoId, eventoId);

        if (data.localId) {
            const local = await InstituicaoRepository.getLocalById(instituicaoId, data.localId);
            if (!local) {
                throw new CustomError(`Novo localId ${data.localId} não encontrado na instituição ${instituicaoId}.`, 404);
            }
        }

        const updatedEvento = await EventoRepository.updateEventoById(eventoId, data);

        if (!updatedEvento) {
            throw new CustomError(`Falha na atualização do Evento ${eventoId}.`, 500);
        }

        return this.mapToResponse(updatedEvento);
    }

    // DELETE: Exclui um evento (URL: /instituicoes/:instituicaoId/eventos/:eventoId)
    async deleteEventoById(instituicaoId: string, eventoId: string): Promise<boolean> {
        
        await this.checkEventoInstituicao(instituicaoId, eventoId);

        const deleted = await EventoRepository.deleteEventoById(eventoId);
        
        if (!deleted) {
            throw new CustomError(`Falha na exclusão do Evento ${eventoId}.`, 500);
        }
        
        return true;
    }

    // Helper para mapeamento
    private mapToResponse(evento: Evento): EventoResponse {
        return {
            eventoId: evento.eventoId,
            instituicaoId: evento.instituicaoId,
            titulo: evento.titulo,
            data: evento.data,
            tipo: evento.tipo,
            descricao: evento.descricao,
            localId: evento.localId,
            // ... (adicionar outros campos se houverem no DTO de resposta)
        } as EventoResponse;
    }
}

export default new EventoService();