import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUsecase";

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createSpecificationUseCase.excute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
