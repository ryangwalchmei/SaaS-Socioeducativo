//status code: 400 Falta de campos obrigatórios.
export class BadRequestError extends Error {
  statusCode: any;
  constructor(message, cause) {
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
  statusCode: number;
  action: any;
  constructor({ cause, message, action }) {
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

//status code: 401 - Erro na autenticação
export class UnauthorizedError extends Error {
  action: any;
  statusCode: number;
  constructor({ message = "Acesso não autorizado", cause, action }) {
    super(message || "Usuário não autenticado", {
      cause,
    });
    this.name = "UnauthorizedError";
    this.action = action || "Faça novamente o login para continuar";
    this.statusCode = 401;
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

//status code: 403  quando o usuário está autenticado mas não tem permissão.
export class ForbiddenError extends Error {
  statusCode: number;
  constructor(
    message = "Você não tem permissão para acessar este recurso",
    cause,
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

//status code: 404  O recurso (rota, item, ID, etc.) não foi encontrado.
export class NotFoundError extends Error {
  action: any;
  statusCode: number;
  constructor({ cause, message, action }) {
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

//status code: 405  Método inválido.
export class MethodNotAllowedError extends Error {
  action: string;
  statusCode: number;
  method: any;
  allowedMethods: any[];
  constructor({ cause, method, allowedMethods = [] }) {
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

//status code: 409 quando há conflitos como "email já registrado", etc.
export class ConflictError extends Error {
  statusCode: number;
  constructor(message = "Conflito com o estado atual do recurso", cause) {
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

//status code: 500 Qualquer exceção não tratada.
export class InternalServerError extends Error {
  action: string;
  statusCode: any;
  constructor({ cause, statusCode }) {
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
  action: string;
  statusCode: number;
  constructor({ cause, message }) {
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
