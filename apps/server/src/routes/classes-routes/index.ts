import { ClassesController } from "@/controllers/ClassesController";
import { verifyJwt } from "@/middlewares/auth";
import type { FastifyInstance } from "fastify";

export const classesRoutes = (fastify: FastifyInstance) => {
    const classesController = new ClassesController();

    fastify.get("/classes", classesController.getClasses);
    fastify.post("/classes", { onRequest: [verifyJwt] }, classesController.create);
}