import { Noticia } from '../models/noticia';
import { readFile, writeFile } from 'fs/promises';

const ruta = "./src/data/noticia.json";

export class noticiaRepository {

    private async leerNoticia(): Promise<Noticia[]> {
        try {
            const noticias = await readFile(ruta, "utf-8");

            return JSON.parse(noticias);
        } catch {
            return[];
        };
    };

    
    private async guardarNoticia(noticias: Noticia[]): Promise<void> {
        await writeFile(
            ruta,
            JSON.stringify(noticias, null, 2),
            "utf-8"
        )
    };


    public async findAll(): Promise<Noticia[]> {
        return await this.leerNoticia();
    };


    public async findById(id: number): Promise<Noticia | undefined> {
        const noticias = await this.leerNoticia();

        return noticias.find(p => p.idNoticia === id);
    };


    public async create(nuevaNoticia: Noticia): Promise<void> {
        const noticias = await this.leerNoticia();

        noticias.push(nuevaNoticia);
        await this.guardarNoticia(noticias);
    };


    public async update(id: number, noticiaActualizado: Partial<Noticia>): Promise<boolean> {
        const noticias = await this.leerNoticia();
        const noti = noticias.findIndex(p => p.idNoticia === id);

        if (noti === -1) return false;

        Object.assign(noticias[noti], noticiaActualizado);
        await this.guardarNoticia(noticias);
        return true;
    };

    public async delete (id: number): Promise<boolean> {
        const noticias = await this.leerNoticia();
        const noti = noticias.findIndex(p => p.idNoticia === id)

        if (noti === -1) return false;

        noticias.splice(noti, 1);
        await this.guardarNoticia(noticias);
        return true;
    };
};