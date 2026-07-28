import { usuarioRepository } from '../data/usuarioRepository';
import { Usuario } from '../models/usuario';

export class usuarioService {
    private repository = new usuarioRepository();

    public async obtenerUsuarios(): Promise<Usuario[]> {
        return await this.repository.findAll();
    }


    public async obtenerUsuarioPorId(id: number): Promise<Usuario> {
        const usuario = await this.repository.findById(id);
        
        if (!usuario) {
            throw new Error(`Usuario con ID ${id} no encontrado.`);
        }

        return usuario;
    }


    public async crearUsuario(data: Usuario): Promise<Usuario> {
        
        const usuarios = await this.repository.findAll();
        const emailCorrecto = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const roles = ["Fotografo", "Cliente", "Admin"];

        if (!data.nombre || !data.email || !data.contrasena) {
            throw new Error("Todos los campos son obligatorios.");
        }

        if (!emailCorrecto.test(data.email)) {
            throw new Error("Email inválido.");
        };

        if (data.contrasena.length < 6) {
            throw new Error("Contraseña muy corta.");
        };

        if (!roles.includes(data.rol)) {
            throw new Error("Rol inválido.");
        };

        if (usuarios.find(u => u.email === data.email)) {
            throw new Error("El email ya está registrado.");
        }

        await this.repository.create(data);
        return data;
    }


    public async actualizarUsuario(usuarioActualizado: Usuario): Promise<void> {
        
        const existe = await this.repository.findById(usuarioActualizado.idUsuario);
        const usuarios = await this.repository.findAll();
        const emailDuplicado = usuarios.find(
            u => u.email === usuarioActualizado.email &&
            u.idUsuario !== usuarioActualizado.idUsuario
        );
        const roles = ["Fotografo", "Admin"];

        if (!existe) {
            throw new Error("No se puede actualizar: el usuario no existe");
        }        

        if (emailDuplicado) {
            throw new Error("El email ya está registrado por otro usuario.");
        }

        if (usuarioActualizado.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(usuarioActualizado.email)) {
                throw new Error("El formato del email no es válido.");
            }
        }

        if (usuarioActualizado.rol && !roles.includes(usuarioActualizado.rol)) {
            throw new Error("El rol proporcionado no es válido.");
        }

        if (usuarioActualizado.contrasena && usuarioActualizado.contrasena.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres.");
        }

        await this.repository.update(usuarioActualizado.idUsuario, usuarioActualizado);
    }


    public async eliminarUsuario(id: number): Promise<void> {
        const eliminado = await this.repository.delete(id);
        
        if (!eliminado) {
            throw new Error("No se pudo eliminar el usuario porque no existe.");
        }
    }
}