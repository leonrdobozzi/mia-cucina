import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../infrastructure/repository/prisma";
import { RequestWithParams } from "../../../src/request";

export async function updateMyFood(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });
  app.patch("/food/:id", async (request: RequestWithParams, response) => {
    try {
      const bodySchema = z.object({
        name: z.string().optional(),
        preparation_time: z.string().optional(),
        dificulty: z.string().optional(),
        revenue: z.string().optional(),
        category: z.string().optional(),
      });

      const { name, category, preparation_time, dificulty, revenue } =
        bodySchema.parse(request.body);

      if (
        category !== "pasta" &&
        category !== "barbecue " &&
        category !== "burguer" &&
        category !== "lunch" &&
        category !== "others"
      )
        return response.status(401).send({ message: "Category not permited" });

      const food = await prisma.food.findFirst({
        where: {
          id: request.params.id,
          userId: request.user.sub,
        },
      });

      if (!food)
        return response.status(404).send({ message: "Food not found!" });

      await prisma.food.update({
        where: {
          id: food.id,
        },
        data: {
          name,
          categoryName: category,
          preparation_time,
          dificulty,
          revenue,
        },
      });

      return response.status(201).send({ message: "Food edited with success" });
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal Server Error!" });
    }
  });
}
