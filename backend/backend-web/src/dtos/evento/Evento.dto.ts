export interface Evento {
    eventoId: string;
    instituicaoId: string;
    localId: string;
    titulo: string;
    data: Date;
    tipo: string;
    descricao: string;
    
    createdAt?: Date; 
    updatedAt?: Date;
}