import type { GeoPoint } from "firebase-admin/firestore";

export interface SugestaoUpdateInput {
    instituicaoId: string;
    titulo: string;
    descricao: string;
    tipo: string;
    status: string;
    localizacao: GeoPoint;
    fotoUrl: string;
    usuarioId: string;
}