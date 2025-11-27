import type { GeoPoint, Timestamp } from "firebase-admin/firestore";

export interface SugestaoResponse {
    sugestaoId: string;
    instituicaoId: string;
    titulo: string;
    descricao: string;
    tipo: string;
    status: string;
    localizacao: GeoPoint;
    fotoUrl: string;
    dataCriacao: Timestamp;
    usuarioId: string;
}