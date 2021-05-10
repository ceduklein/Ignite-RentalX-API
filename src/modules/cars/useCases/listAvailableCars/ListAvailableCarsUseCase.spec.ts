import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Car Available Descritption",
      license_plate: "ABC-1234",
      daily_rate: 100,
      fine_amount: 40,
      category_id: "cateogry_id",
      brand: "Brand",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 1",
      description: "Car Descritption",
      license_plate: "ABC-4321",
      daily_rate: 100,
      fine_amount: 40,
      category_id: "cateogry_id",
      brand: "Brand",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 1",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 2",
      description: "Car Descritption",
      license_plate: "ABC-5678",
      daily_rate: 100,
      fine_amount: 40,
      category_id: "cateogry_id",
      brand: "Brand Test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand Test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 3",
      description: "Car Descritption",
      license_plate: "ABC-5678",
      daily_rate: 100,
      fine_amount: 40,
      category_id: "category_id_test",
      brand: "Brand Test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id_test",
    });

    expect(cars).toEqual([car]);
  });
});
