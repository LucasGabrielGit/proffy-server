import type { FastifyRequest } from "fastify";

import z from "zod";

import type { FastifyReply } from "fastify";
import prisma from "@proffy-server/db";
import { convertHourToMinutes } from "@/utils/convertHourToMinutes";

const createClassSchema = z.object({
    subject: z.string(),
    cost: z.string(),
    user_id: z.string(),
    schedule: z.object({
        week_day: z.string(),
        from: z.string(),
        to: z.string(),
    }),
})


export class ClassesController {
    async create(req: FastifyRequest, res: FastifyReply) {
        const { cost, subject, user_id, schedule } = createClassSchema.parse(req.body);
        try {
            const classCreated = await prisma.class.create({
                data: {
                    cost,
                    subject,
                    user_id,
                },
            })

            const class_id = classCreated.id

            const createdClassSchedule = await prisma.classSchedule.create({
                data: ({
                    class_id,
                    week_day: Number(schedule.week_day),
                    from: convertHourToMinutes(schedule.from),
                    to: convertHourToMinutes(schedule.to),
                }),
                include: {
                    class: true,
                }
            })

            res.status(201).send({
                createdClassSchedule, classCreated
            })

        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({
                    message: error.message,
                })
            }
        }
    }

    async getClasses(_: FastifyRequest, res: FastifyReply) {
        try {
            const allClasses = await prisma.class.findMany({
                select: {
                    id: true,
                    subject: true,
                    cost: true,
                    user_id: true,
                    class_schedule: {
                        select: {
                            id: true,
                            week_day: true,
                            from: true,
                            to: true,
                            class_id: true,
                        }
                    },
                    user: {
                        select: {
                            name: true,
                            email: true,
                            avatar: true,
                        }
                    },
                }
            })
            if (!allClasses) {
                res.status(404).send({
                    message: "No classes found",
                })
            }

            res.status(200).send({
                classes: allClasses,
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({
                    message: error.message,
                })
            }
        }
    }
}