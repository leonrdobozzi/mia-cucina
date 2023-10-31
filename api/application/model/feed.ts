import { FastifyInstance } from "fastify";
import { feedFoods } from "../../domain/model/feed/feed";

export default async function FeedModel(app: FastifyInstance) {
  app.register(feedFoods);
}
