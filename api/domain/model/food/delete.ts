import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../infrastructure/repository/prisma";
import { RequestWithParams } from "../../../src/request";

export async function deleteMyFood(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });
  app.delete("/food/:id", async (request: RequestWithParams, response) => {
    try {
      const food = await prisma.food.findFirst({
        where: {
          id: request.params.id,
          userId: request.user.sub,
        },
      });

      if (!food)
        return response.status(404).send({ message: "Food not found!" });

      await prisma.food.delete({
        where: {
          id: food.id,
        },
      });

      return response
        .status(201)
        .send({ message: "Food deleted with success" });
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal Server Error!" });
    }
  });
}
