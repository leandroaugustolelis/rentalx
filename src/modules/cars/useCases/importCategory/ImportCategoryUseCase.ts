import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRespository";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categorysRepository: ICategoriesRepository
    ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = parse();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    // ["name", "description"]

                    const [name, description] = line;
                    categories.push({ name, description });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = await this.categorysRepository.findByName(
                name
            );

            if (!existCategory) {
                await this.categorysRepository.create({ name, description });
            }
        });
    }
}

export { ImportCategoryUseCase };
