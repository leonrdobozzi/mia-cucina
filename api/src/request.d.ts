import { FastifyRequest } from "fastify";

type RequestWithParams = FastifyRequest<{
  Params: {
    id: string;
  };
}>;
