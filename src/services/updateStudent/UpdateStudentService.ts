import logger from "@/config/winston";
import { StudentRepository } from "@/repository/StudentRepository";

type UpdateStudentDTO = {
  id: string,
  name: string,
  cpf: string,
  email: string,
  phone: string,
  birthdate: string,
  classRoom: string,
}
class UpdateStudentService {
    
    public async updateStudent(studentData: UpdateStudentDTO) {
        logger.info(`Iniciando a atualização do estudante ${studentData.name} (${studentData.id})`);
        try {            
            await new StudentRepository().update(studentData);             
            logger.info('Estudante foi atualizado com sucesso.');
        } catch (error) {
            logger.error(`Finalização forçada, tivemos um erro ao efetuar a atualização do estudante ${studentData.name} (${studentData.id}).`);
        }
    }
}

export {UpdateStudentService};