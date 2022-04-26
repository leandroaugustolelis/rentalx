import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categorysRepository = null;

const importCategoryUseCase = new ImportCategoryUseCase(categorysRepository);

const importCategoryController = new ImportCategoryController(
    importCategoryUseCase
);

export { importCategoryController };
