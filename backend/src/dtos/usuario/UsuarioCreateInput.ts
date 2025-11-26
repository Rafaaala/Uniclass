export interface UsuarioCreateInput {
    instituicaoId?: string;
    nome: string;
    email: string;
    tipoAcesso: string;
    curso: string;
}