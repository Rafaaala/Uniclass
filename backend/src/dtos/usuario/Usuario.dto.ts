export interface Usuario {
    usuarioId: string;
    instituicaoId: string;
    nome: string;
    email: string;
    tipoAcesso: string;
    curso: string;
    
    createdAt?: Date; 
    updatedAt?: Date;
}