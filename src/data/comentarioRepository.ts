import { Comentario } from '../models/comentario';
import { readFile, writeFile } from 'fs/promises';

const ruta = "./src/data/comentario.json";

export class comentarioRepository {

    private async leerComentario(): Promise<Comentario[]> {
        try {
            const comentarios = await readFile(ruta, "utf-8");

            return JSON.parse(comentarios);
        } catch {
            return[];
        };
    };

    
    private async guardarComentario(comentarios: Comentario[]): Promise<void> {
        await writeFile(
            ruta,
            JSON.stringify(comentarios, null, 2),
            "utf-8"
        )
    };


    public async findAll(): Promise<Comentario[]> {
        return await this.leerComentario();
    };


    public async findById(id: number): Promise<Comentario | undefined> {
        const comentarios = await this.leerComentario();

        return comentarios.find(p => p.idComentario === id);
    };


    public async create(nuevoComentario: Comentario): Promise<void> {
        const comentarios = await this.leerComentario();

        comentarios.push(nuevoComentario);
        await this.guardarComentario(comentarios);
    };


    public async update(id: number, comentarioActualizado: Partial<Comentario>): Promise<boolean> {
        const comentarios = await this.leerComentario();
        const com = comentarios.findIndex(p => p.idComentario === id);

        if (com === -1) return false;

        Object.assign(comentarios[com], comentarioActualizado);
        await this.guardarComentario(comentarios);
        return true;
    };

    public async delete (id: number): Promise<boolean> {
        const comentarios = await this.leerComentario();
        const com = comentarios.findIndex(p => p.idComentario === id)

        if (com === -1) return false;

        comentarios.splice(com, 1);
        await this.guardarComentario(comentarios);
        return true;
    };
};