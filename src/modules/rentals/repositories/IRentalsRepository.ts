import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

import { Rental } from "../infra/typeorm/entities/Rental";

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}
