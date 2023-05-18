import { v4 as uuid } from 'uuid';
import  knex from '@/config/knex';
import { NewStudent } from '@/interfaces/NewStudent';
import { UpdateStudent } from '@/interfaces/UpdateStudent';
import { Student } from '@/interfaces/Student';
import { ListOfStudent } from '@/interfaces/ListOfStudent';
import { UniqueStudent } from '@/interfaces/UniqueStudent';

class StudentRepository {
  async create(newStudent: NewStudent): Promise<string> {
    const student: Student = {
      id: uuid(),
      name: newStudent.name,
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

  async getAll(): Promise<object>{
    return await knex<ListOfStudent>('students');
  }

  async getUnique(studentId: string){
    return await knex<UniqueStudent>('students').where('id', studentId).first();
  }

  async update(updateStudent: Student): Promise<boolean>{
    const student: Student = {
        id: updateStudent.id,
        name: updateStudent.name,
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
    return await knex<UniqueStudent>('students').where('id', studentId).del();
  }
}

export { StudentRepository };
