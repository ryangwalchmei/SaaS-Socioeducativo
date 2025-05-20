type ErrorProps = {
  cause?: Error;
  message?: string;
  action?: string;
  statusCode?: number;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  allowedMethods?: ErrorProps["method"][];
};

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
