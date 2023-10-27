import { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "../../../infrastructure/repository/prisma";
import { RequestWithParams } from "../../../src/request";
import { z } from "zod";

export async function updateMyWine(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.patch("/wine/:id", async (request: RequestWithParams, response) => {
    try {
      const bodySchema = z.object({
        name: z.string().optional(),
        grape: z.string().optional(),
        harvest: z.string().optional(),
        type: z.string().optional(),
        rate: z.string().optional(),
        description: z.string().optional(),
      });

      const { name, grape, harvest, type, rate, description } =
        bodySchema.parse(request.body);

      const userId = request.user.sub;

      if (request.params.id.length < 24)
        return response.status(400).send({ message: "Wine id is wrong!" });

      const wine = await prisma.wine.findFirst({
        where: {
          id: request.params.id,
          userId,
        },
      });

      if (!wine)
        return response
          .status(401)
          .send({ message: "Wine not found or not authorized to edit!" });

      await prisma.wine.update({
        where: {
          id: request.params.id,
        },
        data: {
          name,
          grape,
          harvest,
          type,
          rate,
          description,
        },
      });
      return response
        .status(200)
        .send({ message: "Wine updated with success!" });
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal Server Error!" });
    }
  });
}
