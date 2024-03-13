import { FastifyPluginAsync } from "fastify";
import OpenAI from "openai";

const openai = new OpenAI();

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    const question = (request.query as any)?.question;

    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "Answer the following question in 1 word" },
        { role: "user", content: question },
      ],
      model: "gpt-3.5-turbo",
    });

    return response.choices[0].message.content;
  });
};

export default example;
