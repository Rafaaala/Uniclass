import type { GeoPoint } from "firebase-admin/firestore";

export interface InstituicaoCreateInput {
    nome: string;
    logoUrl: string;
    mapaUrl: string;
}

export interface LocalCreateInput {
    nome: string;
    tipo: string;
    bloco: string;
    coordenadas: GeoPoint;
    mapaXY: Map<string, number>;
    acessivel: boolean;
}