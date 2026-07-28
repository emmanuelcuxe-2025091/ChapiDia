import { Categoria } from '../models/categoria';
import { readFile, writeFile } from 'fs/promises';

const ruta = "./src/data/categoria.json";

export class categoriaRepository {

    private async leerCategoria(): Promise<Categoria[]> {
        try {
            const categorias = await readFile(ruta, "utf-8");

            return JSON.parse(categorias);
        } catch {
            return[];
        };
    };

    
    private async guardarCategoria(categorias: Categoria[]): Promise<void> {
        await writeFile(
            ruta,
            JSON.stringify(categorias, null, 2),
            "utf-8"
        )
    };


    public async findAll(): Promise<Categoria[]> {
        return await this.leerCategoria();
    };


    public async findById(id: number): Promise<Categoria | undefined> {
        const categorias = await this.leerCategoria();

        return categorias.find(p => p.idCategoria === id);
    };


    public async create(nuevaCategoria: Categoria): Promise<void> {
        const categorias = await this.leerCategoria();

        categorias.push(nuevaCategoria);
        await this.guardarCategoria(categorias);
    };


    public async update(id: number, categoriaActualizada: Partial<Categoria>): Promise<boolean> {
        const categorias = await this.leerCategoria();
        const cate = categorias.findIndex(p => p.idCategoria === id);

        if (cate === -1) return false;

        Object.assign(categorias[cate], categoriaActualizada);
        await this.guardarCategoria(categorias);
        return true;
    };

    public async delete (id: number): Promise<boolean> {
        const categorias = await this.leerCategoria();
        const cate = categorias.findIndex(p => p.idCategoria === id)

        if (cate === -1) return false;

        categorias.splice(cate, 1);
        await this.guardarCategoria(categorias);
        return true;
    };
};