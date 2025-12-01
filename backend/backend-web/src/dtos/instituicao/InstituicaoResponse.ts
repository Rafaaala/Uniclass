import type { GeoPoint } from "firebase-admin/firestore";

export interface InstituicaoResponse {
    instituicaoId: string;
    nome: string;
    logoUrl: string;
    mapaUrl: string;
}

export interface LocalResponse {
    localId: string;
    nome: string;
    tipo: string;
    bloco: string;
    coordenadas: GeoPoint;
    mapaXY: Map<string, number>;
    acessivel: boolean;
}