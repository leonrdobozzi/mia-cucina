import { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "../../../infrastructure/repository/prisma";
import { RequestWithParams } from "../../../src/request";

export async function deleteMyWine(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.delete("/wine/:id", async (request: RequestWithParams, response) => {
    try {
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
          .send({ message: "Wine not found or not authorized to delete!" });

      await prisma.wine.delete({
        where: {
          id: wine.id,
        },
      });
      return response
        .status(200)
        .send({ message: "Wine deleted with success!" });
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal Server Error!" });
    }
  });
}
