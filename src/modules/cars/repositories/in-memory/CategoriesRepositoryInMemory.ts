import { Category } from "../../infra/typeorm/entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRespository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];
    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(
            (categories) => categories.name === name
        );

        return category;
    }
    async list(): Promise<Category[]> {
        const all = this.categories;

        return all;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
        });

        this.categories.push(category);
    }
}

export { CategoriesRepositoryInMemory };
