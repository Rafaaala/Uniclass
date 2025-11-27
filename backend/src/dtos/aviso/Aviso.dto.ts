export interface Aviso {
    avisoId: string;
    instituicaoId: string; 
    usuarioId: string;     
    usuarioNome: string;   
    titulo: string;
    mensagem: string;
    dataCriacao: Date;     
    prioridade: string;
    cursoAlvo: string[];   
}