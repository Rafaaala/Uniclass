import type { Instituicao, Local } from "./Instituicao.dto.js";

export type InstituicaoUpdateInput = Partial<Omit<Instituicao, 'instituicaoId' | 'createdAt' | 'updatedAt'>>;

export interface LocalUpdateInput extends Partial<Omit<Local, 'localId'>> {}