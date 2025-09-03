import controller from "infra/controller";
import { ErrorProps, MethodNotAllowedError } from "infra/errors/customizeds";
import status from "models/status";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(getHandler);
router.all((request) => {
  const allowedMethods: ErrorProps["allowedMethods"] = ["GET"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method as ErrorProps["method"],
    allowedMethods,
  });
});

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const statusServices = await status.getStatusServices();
  response.status(200).json(statusServices);
}
