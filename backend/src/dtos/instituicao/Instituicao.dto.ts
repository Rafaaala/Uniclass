import { GeoPoint } from 'firebase-admin/firestore';

export interface Local {
    localId: string;
    nome: string;
    tipo: string;
    bloco: string;
    coordenadas: GeoPoint;
    mapaXY: Map<string, number>;
    acessivel: boolean;

    createdAt?: Date; 
    updatedAt?: Date;
}

export interface Instituicao {
    instituicaoId: string;
    nome: string;
    logoUrl: string;
    mapaUrl: string;
    configuracoes: Record<string, string>;

    createdAt?: Date; 
    updatedAt?: Date;
}

