import prisma from "@proffy-server/db";
import bcrypt from "bcryptjs";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    avatar: z.string(),
    whatsapp: z.string(),
    bio: z.string(),
})

const updateUserSchema = createUserSchema.omit({ password: true });


const updatePasswordSchema = z.object({
    password: z.string(),
})

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})


export class UserController {
    async signIn(req: FastifyRequest<{ Body: z.infer<typeof signInSchema> }>, res: FastifyReply) {
        try {
            const data = signInSchema.parse(req.body);

            const user = await prisma.user.findUniqueOrThrow({
                where: {
                    email: data.email,
                }
            }).catch(() => {
                throw new Error("Email not found");
            })

            const passwordMatch = await bcrypt.compare(data.password, user.password);
            if (!passwordMatch) {
                throw new Error("Invalid password");
            }

            const token = await res.jwtSign({
                sub: user.id,
                email: user.email,
            }, {
                expiresIn: "1h",
            })
            console.log(token)

            res.status(200).send({ token })

        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).send(error.issues);
            } else if (error instanceof Error) {
                res.status(400).send({
                    message: error.message,
                })
            }
        }
    }

    async create(req: FastifyRequest<{ Body: z.infer<typeof createUserSchema> }>, res: FastifyReply) {
        try {
            const user = createUserSchema.parse(req.body);
            const hashedPassword = await bcrypt.hash(user.password, 10);

            const userExists = await prisma.user.findUnique({
                where: {
                    email: user.email,
                }
            })

            if (userExists) {
                throw new Error("Email already exists");
            }

            await prisma.user.create({
                data: {
                    ...user,
                    password: hashedPassword,
                }
            }).then(() => {
                res.status(201).send({
                    message: "User created successfully",
                })
            }).catch(() => {
                throw new Error("Error creating user");
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).send(error.issues);
            } else if (error instanceof Error) {
                res.status(400).send({
                    message: error.message,
                })
            }
        }
    }

    async findAll(_: FastifyRequest, res: FastifyReply) {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                    whatsapp: true,
                    bio: true,
                }
            });
            res.status(200).send(users);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({
                    message: error.message,
                })
            }
        }
    }

    async findById(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUniqueOrThrow({
                where: {
                    id,
                }
            })
            res.status(200).send(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({
                    message: error.message,
                })
            }
        }
    }

    async delete(req: FastifyRequest, res: FastifyReply) {
        try {
            const { id } = req.params as { id: string };
            await prisma.user.delete({
                where: {
                    id,
                }
            })
            res.status(200).send({
                message: "User deleted successfully",
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({
                    message: error.message,
                })
            }
        }
    }

    async update(req: FastifyRequest, res: FastifyReply) {
        try {
            const { id } = req.params as { id: string };
            const user = updateUserSchema.parse(req.body);

            await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    ...user,
                }
            })
            res.status(200).send({
                message: "User updated successfully",
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({
                    message: error.message,
                })
            }
        }
    }

    async updatePassword(req: FastifyRequest, res: FastifyReply) {
        try {
            const { id } = req.params as { id: string };
            const { password } = updatePasswordSchema.parse(req.body);
            const hashedPassword = await bcrypt.hash(password, 10);

            await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    password: hashedPassword,
                }
            })
            res.status(200).send({
                message: "Password updated successfully",
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