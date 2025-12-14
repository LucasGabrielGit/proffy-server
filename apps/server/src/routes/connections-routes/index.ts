import { ConnectionsController } from "@/controllers/ConnectionsController";
import type { FastifyInstance } from "fastify";

export const connectionsRoutes = (fastify: FastifyInstance) => {
    const connectionsController = new ConnectionsController();

    fastify.get("/connections", connectionsController.getConnections);
    fastify.post("/connections", connectionsController.create);
}