import type { FastifyRequest } from "fastify"

import type { FastifyReply } from "fastify"

import prisma from "@proffy-server/db"

export class ConnectionsController {
    async getConnections(_: FastifyRequest, res: FastifyReply) {
        try {
            const totalConnections = await prisma.connection.count()

            res.status(200).send({
                total: totalConnections,
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({
                    message: error.message,
                })
            }
        }
    }

    async create(req: FastifyRequest, res: FastifyReply) {
        const { user_id } = req.body as { user_id: string }
        try {
            await prisma.connection.create({
                data: {
                    user_id,
                },
            })

            res.status(201).send()
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({
                    message: error.message,
                })
            }
        }
    }
}