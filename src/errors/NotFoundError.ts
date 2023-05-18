/**
 * Error para recurso não encontrado.
 */
class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { NotFoundError };
