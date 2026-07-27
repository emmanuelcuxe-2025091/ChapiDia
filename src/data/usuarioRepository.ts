import { readFile, writeFile } from 'fs/promises';
import { Usuario } from '../models/usuario';

const ruta = "./src/data/usuario.json"

export class UsuarioRepository {

    private async leerUsuario(): Promise<Usuario[]> {
        try {
            const datos = await readFile(ruta, "utf-8");
            
            return JSON.parse(datos);
        } catch {
            return [];
        }
    }


    private async guardarUsuario(usuarios: Usuario[]): Promise<void> {
        await writeFile(
            ruta,
            JSON.stringify(usuarios, null, 2),
            "utf-8");
    };


    public async findAll(): Promise<Usuario[]> {
        return await this.leerUsuario();
    }


    public async findById(id: number): Promise<Usuario | undefined> {
        const usuarios = await this.leerUsuario();

        return usuarios.find(p => p.idUsuario === id);
    };


    public async create(nuevoUsuario: Usuario): Promise<void> {
        const usuarios = await this.leerUsuario();

        usuarios.push(nuevoUsuario);
        await this.guardarUsuario(usuarios);
    };


    public async update(id: number, usuarioActulizado: Partial<Usuario>): Promise<boolean> {
        const usuarios = await this.leerUsuario();
        const usu = usuarios.findIndex(p => p.idUsuario === id);

        if (usu === -1) return false;

        Object.assign(usuarios[usu], usuarioActulizado);
        await this.guardarUsuario(usuarios);
        return true;
    };


    public async delete(id: number): Promise<boolean> {
        const usuarios = await this.leerUsuario();
        const usua = usuarios.findIndex(p => p.idUsuario === id);

        if (usua === -1) return false;

        usuarios.splice(usua, 1);
        await this.guardarUsuario(usuarios);
        return true;
    };
};