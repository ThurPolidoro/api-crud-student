import { v4 as uuid } from 'uuid';
import  knex from '@/config/knex';

type ListOfStudent = {
  id: string;
  name: string;
  classroom?: string; 
}

type NewStudent  = {
  name: string,
  cpf: string,
  email: string,
  phone?: string,
  birthdate?: string,
  classRoom?: string,
}

type Student  = {
  id: string,
  name: string,
  cpf: string,
  email: string,
  phone?: string,
  birthdate?: string,
  classRoom?: string,
  created_at?: Date,
  updated_at?: Date
}


class StudentRepository {

  async create(newStudent: NewStudent): Promise<string> {
    const student: Student = {
      id: uuid(),
      name: newStudent.name,
      cpf: newStudent.cpf,
      email: newStudent.email,
      phone: newStudent.phone,
      birthdate: newStudent.birthdate,
      classRoom: newStudent.classRoom,
      created_at: new Date(),
      updated_at: new Date()
    };

    await knex('students').insert(student);
    return student.id;
  }

  async findAll(): Promise<object>{
    return await knex<ListOfStudent>('students');
  }

  async findById(studentId: string){
    return await knex<Student>('students').where('id', studentId).first();
  }

  async findByEmail(studentEmail: string){
    return await knex<Student>('students').where('email', studentEmail).first();
  }

  async findByCpf(studentCpf: string){
    return await knex<Student>('students').where('cpf', studentCpf).first();
  }

  async update(updateStudent: Student): Promise<boolean>{
    const student: Student = {
        id: updateStudent.id,
        name: updateStudent.name,
        cpf: updateStudent.cpf,
        email: updateStudent.email,
        phone: updateStudent.phone,
        birthdate: updateStudent.birthdate,
        classRoom: updateStudent.classRoom,
        updated_at: new Date()
    }
    
    await knex('students').where('id', student.id).update(student);

    return true;
  }

  async delete(studentId: string){
    return await knex<Student>('students').where('id', studentId).del();
  }
}

export { StudentRepository };
