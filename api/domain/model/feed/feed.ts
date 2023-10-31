import { FastifyInstance } from "fastify";
import { prisma } from "../../../infrastructure/repository/prisma";
import "@fastify/jwt";
import { Food } from "@prisma/client";

interface IFoodWithUsername extends Food {
  username?: string;
}

export async function feedFoods(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/feed", async (request, response) => {
    try {
      const foods: IFoodWithUsername[] = await prisma.food.findMany({
        where: {
          isPublic: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (foods.length <= 0)
        return response.status(404).send({ message: "Foods not found" });

      for (const food in foods) {
        const username = await prisma.user.findFirst({
          where: {
            id: foods[food].userId,
          },
        });

        foods[food].username = username?.name;
      }

      return response.status(200).send(foods);
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal server error!" });
    }
  });
}
