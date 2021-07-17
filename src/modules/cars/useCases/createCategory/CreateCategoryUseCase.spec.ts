import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test",
    };
    await createCategoryUseCase.excute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a new category when category name already exists", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test",
    };

    await createCategoryUseCase.excute(category);

    await expect(
      createCategoryUseCase.excute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category already exists."));
  });
});
