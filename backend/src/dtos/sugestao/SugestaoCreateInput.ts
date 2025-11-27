import type { GeoPoint } from "firebase-admin/firestore";

export interface SugestaoCreateInput {
    instituicaoId: string;
    titulo: string;
    descricao: string;
    tipo: string;
    status: string;
    localizacao: GeoPoint;
    fotoUrl: string;
    usuarioId: string;
}