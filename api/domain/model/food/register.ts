import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../infrastructure/repository/prisma";

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
        image: z.string(),
        dificulty: z.string(),
        revenue: z.string(),
      });

      const { name, category, preparation_time, dificulty, revenue, image } =
        bodySchema.parse(request.body);

      const permitedCategories: String[] = [
        "pasta",
        "barbecue",
        "burguer",
        "lunch",
        "others",
      ];

      if (!permitedCategories.includes(category))
        return response
          .status(401)
          .send({ message: "Category not permited", permitedCategories });

      const categoryExists = await prisma.foodCategory.findFirst({
        where: {
          name: category,
        },
      });

      const categoryRegistered = !categoryExists
        ? await prisma.foodCategory.create({
            data: {
              name: category,
            },
          })
        : categoryExists;

      const food = await prisma.food.create({
        data: {
          name,
          foodCategoryId: categoryRegistered.id,
          preparation_time,
          dificulty,
          revenue,
          image,
          userId: request.user.sub,
          isPublic: true,
        },
      });

      return response.status(201).send({
        message: "Food created with success!",
        food,
      });
    } catch (e) {
      console.log(e);
      return response.status(500).send({ message: "Internal Server Error!" });
    }
  });
}
