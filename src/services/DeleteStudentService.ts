import logger from "@/config/winston";
import { InvalidValueError } from "@/errors/InvalidValueError";
import { StudentRepository } from "@/repository/StudentRepository";

class DeleteStudentService {
  public async deleteStudent(studentId: string) {
    logger.info("Iniciando remoção do estudante em nosso sistema.");
    try {
      const studentRepository = new StudentRepository();
      const studentFounded = await studentRepository.findById(studentId);

      if (!studentFounded) {
        throw new InvalidValueError(
          "O estudante não foi localizado em nosso sistema."
        );
      }

      const studentResult = await studentRepository.delete(studentId);

      if (!studentResult) {
        throw new InvalidValueError(
          "Um erro inexperado ocorreu, entre em contato com um administrador."
        );
      }

      logger.error("O estudante foi removido de nosso sistema com sucesso.");
    } catch (error) {
      logger.error(
        "Finalização forçada, ocorreu um erro na hora de remover o estudante."
      );
      throw error;
    }
  }
}

export { DeleteStudentService };
