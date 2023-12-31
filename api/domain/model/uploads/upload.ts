import { randomUUID } from "node:crypto";
import { extname, resolve } from "node:path";
import { FastifyInstance } from "fastify";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pump = promisify(pipeline);

export async function uploadRoutes(app: FastifyInstance) {
  app.post("/upload", async (request, response) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5mb
      },
    });

    if (!upload) return response.status(400).send();

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/;
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype);

    if (!isValidFileFormat) return response.status(400).send();

    const fileId = randomUUID();
    const extension = extname(upload.filename);

    const fileName = fileId.concat(extension);

    const writeStream = createWriteStream(
      resolve(__dirname, "../../../src/upload", fileName),
    );

    await pump(upload.file, writeStream);

    const fullUrl = request.protocol.concat("://").concat("192.168.1.4:8080");
    const fileUrl = new URL(`/upload/${fileName}`, fullUrl).toString();

    return { fileUrl };
  });
}
