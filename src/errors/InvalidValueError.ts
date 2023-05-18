/**
 * Erro para valores inválidos.
 */
class InvalidValueError extends Error {
  constructor(message: string | undefined) {
    super(message || 'Foi recebido um valor inválido');
  }
}

export { InvalidValueError };
