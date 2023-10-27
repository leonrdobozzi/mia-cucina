import { FastifyInstance } from "fastify";
import { registerWine } from "../../domain/model/wine/register";
import { getMyUniqueWine, getMyWines } from "../../domain/model/wine/read";
import { deleteMyWine } from "../../domain/model/wine/delete";
import { updateMyWine } from "../../domain/model/wine/edit";

export default async function WineModel(app: FastifyInstance) {
  app.register(registerWine);
  app.register(getMyWines);
  app.register(getMyUniqueWine);
  app.register(deleteMyWine);
  app.register(updateMyWine);
}
