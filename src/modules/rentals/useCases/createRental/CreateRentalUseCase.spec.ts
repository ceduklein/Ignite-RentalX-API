import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const returnDate24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "Brand",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "121212",
      expected_return_date: returnDate24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if user already has an open rental", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "121212",
      expected_return_date: returnDate24Hours,
      user_id: "test",
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "54321",
        user_id: "test",
        expected_return_date: returnDate24Hours,
      })
    ).rejects.toEqual(
      new AppError("There's a rental in progress for this user.")
    );
  });

  it("should not be able to create a new rental with an unavailable car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      user_id: "121212",
      expected_return_date: returnDate24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "test",
        user_id: "123123",
        expected_return_date: returnDate24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable."));
  });

  it("should not be able to create a new rental with with less than 24 hours return date", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "test",
        user_id: "121212",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError("The rental must have at least 24 hours duration.")
    );
  });
});
