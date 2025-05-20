export class InternalServerError extends Error {
  action: string;
  statusCode: number;

  constructor({ cause, statusCode }: { cause: string; statusCode: number }) {
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

  constructor({ cause, message }: { cause: Error; message: string }) {
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
