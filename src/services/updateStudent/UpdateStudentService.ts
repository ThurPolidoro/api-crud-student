import logger from "@/config/winston";
import { StudentRepository } from "@/repository/StudentRepository";
import { UpdateStudentDTO } from "./UpdateStudentDTO";

type StudentResponse = {
    
}

class UpdateStudentService {
    
    public async updateStudent(studentData: UpdateStudentDTO) {
        logger.info(`Iniciando a atualização do estudante ${studentData.name} (${studentData.id})`);
        try {
            new StudentRepository().update(studentData);
            const studentResponse = await this.prepareResponse(studentData);
            
            logger.info('Estudante foi atualizado com sucesso.');
            return studentResponse;
        } catch (error) {
            logger.error(`Finalização forçada, tivemos um erro ao efetuar a atualização do estudante ${studentData.name} (${studentData.id}).`);
        }
    }   
    
    private async prepareResponse(studentData: UpdateStudentDTO): Promise<StudentResponse>
    {
      return {
        id: studentData.id,
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        birthdate: studentData.birthdate,
        classRoom: studentData.classRoom
      };
    }
}

export {UpdateStudentService};