import type { Instituicao } from "./Instituicao.dto.js";

export type InstituicaoUpdateInput = Partial<Omit<Instituicao, 'instituicaoId' | 'createdAt' | 'updatedAt'>>;