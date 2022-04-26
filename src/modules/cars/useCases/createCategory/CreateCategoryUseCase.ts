import { ICategoriesRepository } from "../../repositories/ICategoriesRespository";

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

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category already exists!");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
