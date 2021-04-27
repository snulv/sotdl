import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handlePut = async (query, body) => {
  if (!query.pid) {
    return;
  }

  try {
    const { subAttributes, ...data } = body;
    if (subAttributes) {
      for (const subAttr of subAttributes) {
        const { id, ...subAttrData } = subAttr;
        await prisma.subAttribute.update({
          data: subAttrData,
          where: {
            id: Number(id),
          },
        });
      }
    }

    return await prisma.attribute.update({
      data,
      where: {
        id: Number(query.pid),
      },
      include: {
        subAttributes: true,
      },
    });
  } catch (e) {
    console.debug(e);
    return;
  }
};

const handlePost = async (query, body) => {
  if (!query.pid) {
    return;
  }

  try {
    await prisma.attribute.create({
      data: body,
    });
  } catch (e) {
    console.debug(e);
    return;
  }

  return { update: "OK" };
};

const handledMethods = {
  PUT: handlePut,
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
