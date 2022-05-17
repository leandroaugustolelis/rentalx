import { getRepository, Repository } from "typeorm";

import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Repository<Specification>;

    constructor() {
        this.specifications = getRepository(Specification);
    }

    async create({
        description,
        name,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.specifications.create({
            name,
            description,
        });

        await this.specifications.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.specifications.findOne({ name });

        return specification;
    }
}

export { SpecificationsRepository };
