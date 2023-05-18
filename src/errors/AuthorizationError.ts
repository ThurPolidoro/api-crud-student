/**
 * Erro para falta de autorização de acesso.
 */
class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { AuthorizationError };
