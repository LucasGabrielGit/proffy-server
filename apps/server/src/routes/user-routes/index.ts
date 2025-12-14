import { UserController } from "@/controllers/UserController";
import { verifyJwt } from "@/middlewares/auth";
import type { FastifyInstance } from "fastify";

export const userRoutes = (fastify: FastifyInstance) => {
    const userController = new UserController();

    fastify.post("/auth/login", userController.signIn);
    fastify.post("/user", userController.create)

    fastify.get("/users", { onRequest: [verifyJwt] }, userController.findAll)
    fastify.put("/user/:id", { onRequest: [verifyJwt] }, userController.update)
    fastify.patch("/user/:id/reset-password", { onRequest: [verifyJwt] }, userController.updatePassword)
    fastify.delete("/user/:id", { onRequest: [verifyJwt] }, userController.delete)
}