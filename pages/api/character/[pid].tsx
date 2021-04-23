import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handlePut = async (query, body) => {
  if (!query.pid) {
    return;
  }

  try {
    await prisma.character.update({
      data: body,
      where: {
        id: Number(query.pid),
      },
    });
  } catch (e) {
    console.debug(e);
    return;
  }

  return { update: "OK" };
};

const handledMethods = {
  PUT: handlePut,
};

export default async (req, res) => {
  if (!handledMethods[req.method]) {
    res.status(400).json({ error: req.method + " Not handled bro" });
    return;
  }
  const response = await handledMethods[req.method](req.query, req.body);

  if (!response) {
    res.status(400).json({ error: "Not handled sis" });
    return;
  }

  res.status(200).json(response);
};
