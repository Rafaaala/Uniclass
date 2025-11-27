export interface AvisoCreateInput {
    usuarioId: string;
    usuarioNome: string;
    titulo: string;
    mensagem: string;
    prioridade: string;
    cursoAlvo: string[];
}