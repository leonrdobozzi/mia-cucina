import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../infrastructure/repository/prisma";

interface IIngredientItem {
  name: string;
  quantity: string;
  foodId?: string;
}

export async function registerFood(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });
  app.post("/food", async (request, response) => {
    try {
      const bodySchema = z.object({
        name: z.string(),
        category: z.string(),
        preparation_time: z.string(),
        dificulty: z.string(),
        ingredients: z.array(
          z.object({
            name: z.string(),
            quantity: z.string(),
            foodId: z.string().optional(),
          }),
        ),
        revenue: z.string(),
      });

      const {
        name,
        category,
        preparation_time,
        dificulty,
        ingredients,
        revenue,
      } = bodySchema.parse(request.body);

      const categoryExists = await prisma.foodCategory.findFirst({
        where: {
          name: category,
        },
      });

      let categoryCreated;

      if (!categoryExists) {
        categoryCreated = await prisma.foodCategory.create({
          data: {
            name,
          },
        });
      }

      const foodCategoryIdFiltered = categoryExists
        ? categoryExists.id
        : categoryCreated.id;

      const food = await prisma.food.create({
        data: {
          name,
          foodCategoryId: foodCategoryIdFiltered,
          preparation_time,
          dificulty,
          revenue,
          userId: request.user.sub,
        },
      });

      const ingredientsWithFoodId: IIngredientItem[] = [];

      for (const ingredientIndex in ingredients) {
        (ingredients[ingredientIndex].foodId = food.id),
          ingredientsWithFoodId.push(ingredients[ingredientIndex]);
      }

      const ingredientsSavedInDatabase = await prisma.ingredient.createMany({
        data: [...ingredientsWithFoodId],
      });

      return response.status(201).send({
        message: "Food created with success!",
        food,
        ingredientsSavedInDatabase,
      });
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal Server Error!" });
    }
  });
}
