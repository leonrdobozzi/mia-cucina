import { FastifyInstance } from "fastify";
import { registerFood } from "../../domain/model/food/register";
import { readMyFoods } from "../../domain/model/food/read";
import { updateMyFood } from "../../domain/model/food/edit";
import { deleteMyFood } from "../../domain/model/food/delete";

export default async function FoodModel(app: FastifyInstance) {
  app.register(registerFood);
  app.register(readMyFoods);
  app.register(updateMyFood);
  app.register(deleteMyFood);
}
