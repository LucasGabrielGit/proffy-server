import { ConnectionsController } from "@/controllers/ConnectionsController";
import { verifyJwt } from "@/middlewares/auth";
import type { FastifyInstance } from "fastify";

export const connectionsRoutes = (fastify: FastifyInstance) => {
    const connectionsController = new ConnectionsController();

    fastify.get("/connections", { onRequest: [verifyJwt] }, connectionsController.getConnections);
    fastify.post("/connections", { onRequest: [verifyJwt] }, connectionsController.create);
}