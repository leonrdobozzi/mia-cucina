import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../infrastructure/repository/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(app: FastifyInstance) {
  app.post("/register", async (request, response) => {
    try {
      const bodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      });

      const { name, email, password } = bodySchema.parse(request.body);

      const findUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (findUser)
        return response
          .status(400)
          .send({ message: "User already registered!" });

      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
        select: {
          name: true,
          id: true,
          email: true,
          isPublic: true,
          createdAt: true,
        },
      });

      return response.status(201).send({
        message: "User registered with success!",
        user,
      });
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal Server Error!" });
    }
  });
}
