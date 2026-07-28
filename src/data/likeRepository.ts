import { Like } from '../models/like';
import { readFile, writeFile } from 'fs/promises';

const ruta = "./src/data/like.json";

export class likeRepository {

    private async leerLike(): Promise<Like[]> {
        try {
            const likes = await readFile(ruta, "utf-8");

            return JSON.parse(likes);
        } catch {
            return[];
        };
    };

    
    private async guardarLike(likes: Like[]): Promise<void> {
        await writeFile(
            ruta,
            JSON.stringify(likes, null, 2),
            "utf-8"
        )
    };


    public async findAll(): Promise<Like[]> {
        return await this.leerLike();
    };


    public async findById(id: number): Promise<Like | undefined> {
        const likes = await this.leerLike();

        return likes.find(p => p.idLike === id);
    };


    public async create(nuevoLike: Like): Promise<void> {
        const likes = await this.leerLike();

        likes.push(nuevoLike);
        await this.guardarLike(likes);
    };


    public async update(id: number, likesActualizado: Partial<Like>): Promise<boolean> {
        const likes = await this.leerLike();
        const lik = likes.findIndex(p => p.idLike === id);

        if (lik === -1) return false;

        Object.assign(likes[lik], likesActualizado);
        await this.guardarLike(likes);
        return true;
    };

    public async delete (id: number): Promise<boolean> {
        const likes = await this.leerLike();
        const lik = likes.findIndex(p => p.idLike === id)

        if (lik === -1) return false;

        likes.splice(lik, 1);
        await this.guardarLike(likes);
        return true;
    };
};