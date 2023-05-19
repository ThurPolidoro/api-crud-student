import logger from "@/config/winston";
import { InvalidValueError } from "@/errors/InvalidValueError";
import { StudentRepository } from "@/repository/StudentRepository";

type UpdateStudentDTO = {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthdate: string;
  classRoom: string;
};
class UpdateStudentService {
  public async updateStudent(studentData: UpdateStudentDTO) {
    logger.info(
      `Iniciando a atualização do estudante ${studentData.name} (${studentData.id})`
    );
    try {
      const studentRepository = new StudentRepository();
      const studentFounded = await studentRepository.findById(studentData.id);

      if (!studentFounded) {
        throw new InvalidValueError(
          "O estudante não foi localizado em nosso sistema."
        );
      }

      await studentRepository.update(studentData);
      logger.info("Estudante foi atualizado com sucesso.");
    } catch (error) {
      logger.error(
        `Finalização forçada, tivemos um erro ao efetuar a atualização do estudante ${studentData.name} (${studentData.id}).`
      );
      throw error
    }
  }
}

export { UpdateStudentService };
