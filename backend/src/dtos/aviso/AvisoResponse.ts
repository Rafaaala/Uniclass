export interface AvisoResponse {
    avisoId: string;
    instituicaoId: string;
    usuarioId: string;
    usuarioNome: string;
    titulo: string;
    mensagem: string;
    prioridade: string;
    cursoAlvo: string[];
    dataCriacao: Date;
}