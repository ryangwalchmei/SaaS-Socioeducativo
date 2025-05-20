import { NextApiRequest, NextApiResponse } from "next";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./errors/customizeds";

const simpleHandledErrors = [
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
  ValidationError,
];

type ErrornInErrorHandler = Error & {
  statusCode: number;
};

function onErrorHandler(
  error: ErrornInErrorHandler,
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (error instanceof MethodNotAllowedError) {
    response.setHeader("Allow", error.allowedMethods);
    return response.status(error.statusCode).json(error.toJSON());
  }

  for (const ErrorType of simpleHandledErrors) {
    if (error instanceof ErrorType) {
      return response.status(error.statusCode).json(error.toJSON());
    }
  }

  const internalError = new InternalServerError({
    cause: error,
    statusCode: error.statusCode,
  });
  console.error("Erro interno não tratado:", internalError);
  return response.status(internalError.statusCode).json(internalError.toJSON());
}

function onNoMatchHandler(request: NextApiRequest, response: NextApiResponse) {
  const publicErrorObject = new MethodNotAllowedError({});
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
