import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string,
    name?: string,
    cateogory_id?: string
  ): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
}

export { ICarsRepository };