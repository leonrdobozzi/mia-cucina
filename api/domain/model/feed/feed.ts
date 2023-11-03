import { FastifyInstance } from "fastify";
import { prisma } from "../../../infrastructure/repository/prisma";
import "@fastify/jwt";

export async function feedFoods(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/feed", async (_, response) => {
    try {
      const foods = await prisma.food.findMany({
        where: {
          isPublic: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          preparation_time: true,
          dificulty: true,
          revenue: true,
          isPublic: true,
          foodCategoryId: true,
          image: true,
          createdAt: true,
          user: {
            select: {
              name: true,
            },
          },
          category: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });

      if (foods.length <= 0)
        return response.status(404).send({ message: "Foods not found" });

      return response.status(200).send(foods);
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal server error!" });
    }
  });
}
