import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handlePost = async (query, body) => {
  try {
    return await prisma.attribute.create({
      data: body,
    });
  } catch (e) {
    console.debug(e);
    return;
  }
};

const handledMethods = {
  POST: handlePost,
};

export default async (req, res) => {
  if (!handledMethods[req.method]) {
    res.status(400).json({ error: req.method + ": Not handled bro" });
    return;
  }
  const response = await handledMethods[req.method](req.query, req.body);

  if (!response) {
    res.status(400).json({ error: "Not handled sis" });
    return;
  }

  res.status(200).json(response);
};
