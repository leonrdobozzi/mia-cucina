import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../infrastructure/repository/prisma";
import bcrypt from "bcryptjs";

export async function authUser(app: FastifyInstance) {
  app.post("/auth", async (request, response) => {
    try {
      const bodySchema = z.object({
        email: z.string(),
        password: z.string(),
      });

      const { email, password } = bodySchema.parse(request.body);

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user)
        return response.status(404).send({ message: "User not found!" });

      const validatePassword = bcrypt.compareSync(password, user.password);

      if (!validatePassword)
        return response.status(401).send({ message: "Incorrect password!" });

      const token = app.jwt.sign(
        {
          email: user.email,
        },
        {
          sub: user.id,
          expiresIn: "30 days",
        },
      );

      return response
        .status(200)
        .send({ message: "Logged with success", token });
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal Server Error!" });
    }
  });
}
