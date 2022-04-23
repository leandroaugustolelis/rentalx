import { ICategoriesRepository } from "../repositories/ICategoriesRespository";

interface IRequest {
    name: string;
    description: string;
}

/**
 *
 * Define return type - [X]
 * Change return error - [X]
 * Access repository - [X]
 * Return a valuekk - [X]
 */

class CreateCategoryService {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ name, description }: IRequest): void {
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category already exists!");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryService };
