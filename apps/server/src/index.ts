import "dotenv/config";
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "./routes/user-routes";
import { classesRoutes } from "./routes/classes-routes";
import { connectionsRoutes } from "./routes/connections-routes";

const baseCorsConfig = {
	origin: process.env.CORS_ORIGIN || "",
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	credentials: true,
	maxAge: 86400,
};

const fastify = Fastify({
	logger: true,
});

fastify.register(fastifyCors, baseCorsConfig);

fastify.register(fastifyJwt, {
	secret: process.env.JWT_SECRET || "",
})

fastify.register(userRoutes)
fastify.register(classesRoutes)
fastify.register(connectionsRoutes)

fastify.listen({ port: 3000 }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	console.log("Server running on port 3000");
});
