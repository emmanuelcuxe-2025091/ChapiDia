import { categoriaRepository } from '../data/categoriaRepository';
import { Categoria } from '../models/categoria';

export class categoriaService {
    private repository = new categoriaRepository();

    public async obtenerCategorias(): Promise<Categoria[]> {
        return await this.repository.findAll();
    }


    public async obtenerCategoriaPorId(id: number): Promise<Categoria> {
        const cat = await this.repository.findById(id);

        if (!cat) {
            throw new Error(`Categoría con ID ${id} no encontrada.`);
        }

        return cat;
    }


    public async crearCategoria(data: Categoria): Promise<Categoria> {
        const categorias = await this.repository.findAll();
        
        if (!data.nombreCategoria) {
            throw new Error("El nombre de la categoría es obligatorio.");
        }

        if (categorias.find(c => c.nombreCategoria.toLowerCase() === data.nombreCategoria.toLowerCase())) {
            throw new Error("Esta categoría ya existe.");
        }

        await this.repository.create(data);
        return data;
    }


    public async actualizarCategoria(catActualizada: Categoria): Promise<void> {
        const existe = await this.repository.findById(catActualizada.idCategoria);

        if (!existe) {
            throw new Error("Categoría no encontrada.");
        }
        
        await this.repository.update(catActualizada.idCategoria, catActualizada);
    }

    
    public async eliminarCategoria(id: number): Promise<void> {
        const eliminado = await this.repository.delete(id);

        if (!eliminado) {
            throw new Error("Categoría no encontrada.");
        }
    }
}