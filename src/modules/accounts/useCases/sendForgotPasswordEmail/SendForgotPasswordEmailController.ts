import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordMailUsecase } from "./SendForgotPasswordEmailUseCase";

class SendForgotPasswordEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailUseCase = container.resolve(
      SendForgotPasswordMailUsecase
    );

    await sendForgotPasswordEmailUseCase.execute(email);

    return response.send();
  }
}

export { SendForgotPasswordEmailController };
