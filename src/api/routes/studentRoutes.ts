import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { z } from "zod";
import { StudentRepository } from "@/repository/StudentRepository";
import { CreateStudentService } from "@/services/CreateStudentService";
import { UpdateStudentService } from "@/services/UpdateStudentService";
import { DeleteStudentService } from "@/services/DeleteStudentService";

async function studentRoutes(app: FastifyInstance) {
  app.get("/", recoverAllStudent);
  app.post("/", createStudent);
  app.put("/", updateStudent);
  app.delete("/", removeStudent);
  app.get("/:studentId", recoverUniqueStudent);
}

/**
 *
 * @param request
 * @param reply
 */
async function recoverAllStudent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const studentResponse = await new StudentRepository().findAll();

  return reply.status(200).send({success: true, message: "Lista de Estudantes foi localizada em nosso sistema com sucesso.", data: studentResponse});
}

/**
 *
 * @param request
 * @param reply
 */
async function recoverUniqueStudent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const studentSchema = z.object({
    studentId: z.string().uuid()
  }); 

  const studentData =  studentSchema.parse(request.params);
  const studentResponse = await new StudentRepository().findById(studentData.studentId);

  if(!studentResponse)
    return reply.status(400).send({success: false, message: "Nenhum estudante foi localizado em nosso sistema com este id."});

  return reply.send({success: true, message: "O estudante foi localizado em nosso sistema com sucesso.", data: studentResponse});
}

/**
 *
 * @param request
 * @param reply
 */
async function createStudent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const studentSchema = z.object({
    name: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    phone: z.string().min(16).max(16).optional(),
    birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    classRoom: z.string().min(2).max(3).optional(),
  }); 

  const studentData =  studentSchema.parse(request.body);
  const studentResponse = await new CreateStudentService().createStudent(studentData);

  return reply.status(201).send({success: true, message: "Estudante foi criado em nosso sistema com sucesso.", data: studentResponse});
}

/**
 *
 * @param request
 * @param reply
 */
async function updateStudent(
  request: FastifyRequest,
  reply: FastifyReply
) {  
  const studentSchema = z.object({
    id: z.string(),
    name: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    phone: z.string().min(16).max(16),
    birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    classRoom: z.string().min(2).max(3),
  })


  const studentData =  studentSchema.parse(request.body);
  await new UpdateStudentService().updateStudent(studentData);

  return reply.status(200).send({success: true, message: "Os dados do estudante foi atualizado em nosso sistema com sucesso."});
}

/**
 *
 * @param request
 * @param reply
 */
async function removeStudent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const studentSchema = z.object({
    id: z.string().uuid()
  }); 

  const studentData =  studentSchema.parse(request.body);
  await new DeleteStudentService().deleteStudent(studentData.id);

  return reply.status(200).send({success: true, message: "O estudante foi removido de nosso sistema com sucesso."});
}

export { studentRoutes };
