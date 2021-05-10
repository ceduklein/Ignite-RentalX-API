import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand Name",
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      fine_amount: 30,
      license_plate: "ABC-1234",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with an existent license plate", () => {
    expect(async () => {
      const car = {
        brand: "Brand Name",
        name: "Car Name",
        description: "Car Description",
        daily_rate: 100,
        fine_amount: 30,
        license_plate: "ABC-1234",
        category_id: "category",
      };
      await createCarUseCase.execute(car);
      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand Name",
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      fine_amount: 30,
      license_plate: "ABC-1234",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
