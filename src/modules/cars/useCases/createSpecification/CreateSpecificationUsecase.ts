import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  excute({ name, description }: IRequest): void {
    const specAlreadyExists = this.specificationsRepository.findByName(name);

    if (specAlreadyExists) {
      throw new Error("Specification already exists.");
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
