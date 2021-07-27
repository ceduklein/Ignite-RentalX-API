import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPassowordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPassowordUseCase.execute({ token: String(token), password });

    return response.send();
  }
}

export { ResetPasswordController };
