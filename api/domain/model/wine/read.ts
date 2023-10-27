import { FastifyInstance } from "fastify";
import { prisma } from "../../../infrastructure/repository/prisma";
import { RequestWithParams } from "../../../src/request";

export async function getMyWines(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/wine", async (request, response) => {
    try {
      const userId = request.user.sub;

      const wines = await prisma.wine.findMany({
        where: {
          userId,
        },
      });

      return response.status(200).send(wines);
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal Server Error!" });
    }
  });
}

export async function getMyUniqueWine(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/wine/:id", async (request: RequestWithParams, response) => {
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
          .send({ message: "Wine not found or not authorized to read!" });

      return response.status(200).send(wine);
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal Server Error!" });
    }
  });
}
