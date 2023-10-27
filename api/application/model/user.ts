import { FastifyInstance } from "fastify";
import { registerUser } from "../../domain/model/user/register";
import { authUser } from "../../domain/model/user/login";

export default async function UserModel(app: FastifyInstance) {
  app.register(authUser);
  app.register(registerUser);
}
