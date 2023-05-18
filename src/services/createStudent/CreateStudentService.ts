import logger from '@/config/winston'
import { CreateStudentDTO } from './CreateStudentDTO'
import { StudentRepository } from '@/repository/StudentRepository'

type StudentResponse = {
    id: string,
    name: string,
    email?: string,
    phone?: string,
    birthdate?: string,
    classRoom?: string,
}

class CreateStudentService {
  
  public async createStudent(studentData: CreateStudentDTO): Promise<StudentResponse> {
    logger.info('Iniciando criação do novo estudante.')
    try {
      const studentId = await new StudentRepository().create(studentData);
      const studentResponse = await this.prepareResponse(studentId, studentData);
      
      logger.info('Estudante foi criado com sucesso.');
      return studentResponse;
    } catch (error: any) {
      logger.error('Finalização forçada, ocorreu um erro na hora de criar o estudante.');
      throw error;
    }
  }

  private async prepareResponse(studentId: string, studentData: CreateStudentDTO): Promise<StudentResponse>
  {
    return {
      id: studentId,
      name: studentData.name,
      email: studentData.email,
      phone: studentData.phone,
      birthdate: studentData.birthdate,
      classRoom: studentData.classRoom
    };
  }
}

export { CreateStudentService }
