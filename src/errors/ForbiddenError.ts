/**
 * Erro para falta de permissão.
 */
class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { ForbiddenError };
