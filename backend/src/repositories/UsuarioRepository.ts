import { db } from '../config/firebase.ts'; 
import { FieldValue } from 'firebase-admin/firestore';
import type { Usuario } from '../dtos/usuario/Usuario.dto.ts';
import type { UsuarioCreateInput } from '../dtos/usuario/UsuarioCreateInput.ts';
import type { UsuarioUpdateInput } from '../dtos/usuario/UsuarioUpdateInput.ts';

const usuariosCollection = db.collection('usuarios');

class UsuarioRepository {

    // POST: Cria um novo usuário
    async createUsuario(data: UsuarioCreateInput): Promise<Usuario> {
        const timestamp = FieldValue.serverTimestamp();

        const dadosParaPersistencia = {
            ...data,
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        const docRef = await usuariosCollection.add(dadosParaPersistencia);
        const updatedSnapshot = await docRef.get();
        
        if (!updatedSnapshot.exists) {
            throw new Error("Falha ao recuperar documento do usuário após a criação.");
        }   

        const dataCompleta = updatedSnapshot.data() as Omit<Usuario, 'usuarioId'>;

        return {
            usuarioId: updatedSnapshot.id,
            ...dataCompleta
        } as Usuario;
    }

    // GET: Busca um usuário por ID
    async getUsuarioById(usuarioId: string): Promise<Usuario | null> {
        const docSnapshot = await usuariosCollection.doc(usuarioId).get();
        
        if (!docSnapshot.exists) return null;
        
        const data = docSnapshot.data() as Omit<Usuario, 'usuarioId'>;

        return { 
            usuarioId: docSnapshot.id,
            ...data 
        } as Usuario;
    }
    
    // GET ALL: Busca todos os usuários de uma INSTITUIÇÃO específica
    async getAllUsuariosByInstituicao(instituicaoId: string): Promise<Usuario[]> {
        const querySnapshot = await usuariosCollection
            .where('instituicaoId', '==', instituicaoId)
            .get();

        if (querySnapshot.empty) {
            console.log(`Nenhum usuário encontrado para a instituição ${instituicaoId}`);
            return [];
        }

        const usuarios: Usuario[] = querySnapshot.docs.map(doc => {
        const dataDoDoc = doc.data() as Omit<Usuario, 'usuarioId'>; 
        
        return { 
            usuarioId: doc.id,
            ...dataDoDoc
        } as Usuario;
    });

    return usuarios;
    }

    // PATCH: Atualiza campos específicos de um usuário
    async updateUsuarioById(usuarioId: string, data: UsuarioUpdateInput): Promise<Usuario | null> {
        const usuarioRef = usuariosCollection.doc(usuarioId);
        const docSnapshot = await usuarioRef.get();
        
        if (!docSnapshot.exists) return null;

        const timestamp = FieldValue.serverTimestamp();
        const dadosParaUpdate = {
            ...data,
            updatedAt: timestamp
        };

        await usuarioRef.update(dadosParaUpdate);

        const updatedSnapshot = await usuarioRef.get();
        const updatedData = updatedSnapshot.data() as Omit<Usuario, 'usuarioId'>;

        return {
            usuarioId: updatedSnapshot.id, ...updatedData
        } as Usuario;
    }

    // DELETE: Exclui um usuário
    async deleteUsuarioById(usuarioId: string): Promise<boolean> {
        const usuarioRef = usuariosCollection.doc(usuarioId);
        const docSnapshot = await usuarioRef.get();
        
        if (!docSnapshot.exists) return false;

        await usuarioRef.delete();

        return true;
    }
}

export default new UsuarioRepository();