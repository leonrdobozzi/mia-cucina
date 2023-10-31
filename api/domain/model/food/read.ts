import { FastifyInstance } from "fastify";
import { prisma } from "../../../infrastructure/repository/prisma";
import { RequestWithParams } from "../../../src/request";
import { Food } from "@prisma/client";

interface IFoodWithCategory extends Food {
  category?: string;
}

export async function readMyFoods(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/food", async (request, response) => {
    try {
      const userId = request.user.sub;

      const foods: IFoodWithCategory[] = await prisma.food.findMany({
        where: {
          userId,
        },
      });

      if (foods.length <= 0)
        return response.status(404).send({ message: "Foods not found" });

      const foodWithCategory: IFoodWithCategory[] = [];

      for (const food in foods) {
        const category = await prisma.foodCategory.findFirst({
          where: {
            id: foods[food].foodCategoryId,
          },
        });

        foods[food].category = category?.name;
        foodWithCategory.push(foods[food]);
      }

      return response.status(200).send(foods);
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal server error!" });
    }
  });

  app.get("/food/:id", async (request: RequestWithParams, response) => {
    try {
      const userId = request.user.sub;
      const foodId = request.params.id;

      if (request.params.id.length < 24)
        return response.status(400).send({ message: "Food id is wrong!" });

      const food = await prisma.food.findFirst({
        where: {
          userId,
          id: foodId,
        },
      });

      if (!food)
        return response.status(404).send({ message: "Food not found" });

      return response.status(200).send(food);
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal server error!" });
    }
  });
}
