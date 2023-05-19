import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import logger from '@/config/winston'
import { z } from "zod";
import { CreateStudentService } from "@/services/createStudent/CreateStudentService";
import { StudentRepository } from "@/repository/StudentRepository";
import { UpdateStudentService } from "@/services/updateStudent/UpdateStudentService";

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
  return reply.send(studentResponse);  
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
  return reply.send(studentResponse);
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

  
  return reply.send(studentResponse);
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
  const studentResponse = await new UpdateStudentService().updateStudent(studentData);

  return reply.send(studentResponse);
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
  const studentResult = await new StudentRepository().delete(studentData.id);
  const studentResponse = {"success": Boolean(studentResult)}

  return reply.send(studentResponse);
}

export { studentRoutes };
