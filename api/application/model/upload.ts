import { FastifyInstance } from "fastify";
import { uploadRoutes } from "../../domain/model/uploads/upload";

export default async function UploadModel(app: FastifyInstance) {
  app.register(uploadRoutes);
}
