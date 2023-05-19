import logger from '@/config/winston'
import { StudentRepository } from '@/repository/StudentRepository'

type CreateStudentDTO = {
  id?: string,
  name: string,
  cpf: string,
  email: string,
  phone?: string,
  birthdate?: string,
  classRoom?: string,
}

class CreateStudentService {
  
  public async createStudent(studentData: CreateStudentDTO) {
    logger.info('Iniciando criação do novo estudante.')
    try {
      const studentRepository = new StudentRepository();

      const studentFounded = await studentRepository.findByCpf(studentData.cpf);

      if(studentFounded)
      {
        throw new Error("Já existe um estudante cadastrado com este CPF.");
      }

      const studentId = await studentRepository.create(studentData);
      
      logger.info('Estudante foi criado com sucesso.');
      return { id: studentId };
    } catch (error) {
      logger.error('Finalização forçada, ocorreu um erro na hora de criar o estudante.');
      throw error;
    }
  }
}

export { CreateStudentService }
