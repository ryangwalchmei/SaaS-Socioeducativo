type ErrorProps = {
  cause?: Error;
  message?: string;
  action?: string;
  statusCode?: number;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  allowedMethods?: ErrorProps["method"][];
};

export class BadRequestError extends Error {
  statusCode: number;
  constructor(cause: Error, message: string) {
    super(message, { cause });
    this.name = "BadRequestError";
    this.statusCode = 400;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
    };
  }
}

export class ValidationError extends Error {
  action: string;
  statusCode: number;
  constructor({ cause, message, action }: ErrorProps) {
    super(message || "Um erro de validação ocorreu.", {
      cause,
    });
    this.name = "ValidationError";
    this.action = action || "Ajuste os dados enviados e tente novamente.";
    this.statusCode = 400;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message = "Acesso não autorizado", cause: Error) {
    super(message, { cause });
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
    };
  }
}

export class ForbiddenError extends Error {
  statusCode: number;
  constructor(
    message = "Você não tem permissão para acessar este recurso",
    cause: Error,
  ) {
    super(message, { cause });
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
    };
  }
}

export class NotFoundError extends Error {
  action: string;
  statusCode: number;
  constructor({ cause, message, action }: ErrorProps) {
    super(message || "Não foi possível encontrar este recurso no sistema.", {
      cause,
    });
    this.name = "NotFoundError";
    this.action =
      action || "Verifique se os parâmetros enviados na consulta estão certos.";
    this.statusCode = 404;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  action: string;
  statusCode: number;
  method: ErrorProps["method"];
  allowedMethods: ErrorProps["allowedMethods"];

  constructor({ cause, method, allowedMethods = [] }: ErrorProps) {
    super(`O método HTTP ${method} não é permitido para este endpoint.`, {
      cause,
    });

    this.name = "MethodNotAllowedError";
    this.action = `Use um dos métodos permitidos: ${allowedMethods.join(", ")}`;
    this.statusCode = 405;
    this.method = method;
    this.allowedMethods = allowedMethods;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
      method: this.method,
      allowed_methods: this.allowedMethods,
    };
  }
}

export class ConflictError extends Error {
  statusCode: number;
  constructor(
    message = "Conflito com o estado atual do recurso",
    cause: Error,
  ) {
    super(message, { cause });
    this.name = "ConflictError";
    this.statusCode = 409;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
    };
  }
}

export class InternalServerError extends Error {
  action: string;
  statusCode: number;

  constructor({ cause, statusCode }: ErrorProps) {
    super("Um erro interno não esperado aconteceu.", {
      cause,
    });

    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte";
    this.statusCode = statusCode || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  statusCode: number;
  action: string;

  constructor({ cause, message }: ErrorProps) {
    super(message || "Serviço indisponível no momento.", {
      cause,
    });

    this.name = "ServiceError";
    this.action = "Verifique se o serviço está disponível.";
    this.statusCode = 503;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
