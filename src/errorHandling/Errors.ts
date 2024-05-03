/**
 * Error thrown when an unknown property is encountered.
 */
export class UnknownPropertiesError extends Error {
  constructor(properties: string[]) {
    super(`Unexpected properties: ${properties}`);
    this.name = this.constructor.name;
  }
}

/**
 * Error thrown when a property's value is not the correct type.
 */
export class IncorrectTypeError extends Error {
  constructor(properties: string[]) {
    super(`Properties with incorrect types: ${properties}`);
    this.name = this.constructor.name;
  }
}

/**
 * Error thrown when a requested resource cannot be found.
 */
export class NotFoundError extends Error {
  constructor(message?: string | undefined) {
    super(message);
  }
}

export class BadInputError extends Error {
  constructor(message?: string | undefined) {
    super(message);
  }
}

export class BadRequestError extends Error {
  constructor(message?: string | undefined) {
    super(message);
  }
}

export class ServiceUnavailableError extends Error {
  constructor(message?: string | undefined) {
    super(message);
  }
}

export class AuthError extends Error {
  constructor(message?: string | undefined) {
    super(message);
  }
}

export class ExpiredTokenError extends Error {
  constructor(message?: string | undefined) {
    super(message);
  }
}
