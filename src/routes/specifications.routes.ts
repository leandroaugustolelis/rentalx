import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRespository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specificationsRespository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {});

export { specificationsRoutes };
