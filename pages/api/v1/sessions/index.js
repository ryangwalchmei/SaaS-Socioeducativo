import { createRouter } from "next-connect";
import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/customizeds";
import session from "models/session";
import authentication from "models/authentication";

const router = createRouter();

router.post(postHandler);
router.all((request) => {
  const allowedMethods = ["POST"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInput = request.body;

  const authenticatedUser = await authentication.getAuthenticatedUser(
    userInput.email,
    userInput.password,
  );

  const newSession = await session.create(authenticatedUser.id);
  controller.setSessionCookie(newSession.token, response);

  return response.status(201).json(newSession);
}
