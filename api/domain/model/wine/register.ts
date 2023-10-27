import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../infrastructure/repository/prisma";

export async function registerWine(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });
  app.post("/wine", async (request, response) => {
    try {
      const bodySchema = z.object({
        name: z.string(),
        grape: z.string(),
        harvest: z.string(),
        type: z.string(),
        rate: z.string(),
        description: z.string(),
        wine_image: z.string(),
      });

      const { name, grape, harvest, type, rate, description, wine_image } =
        bodySchema.parse(request.body);

      const verifyIfUserExists = await prisma.user.findFirst({
        where: {
          email: request.user.email,
        },
      });

      if (!verifyIfUserExists)
        return response.status(404).send({ message: "User not found!" });

      await prisma.wine.create({
        data: {
          name,
          grape,
          harvest,
          type,
          rate,
          description,
          userId: verifyIfUserExists.id,
          wine_image,
        },
      });

      return response
        .status(201)
        .send({ message: "Wine created with success!" });
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal Server Error!" });
    }
  });
}
