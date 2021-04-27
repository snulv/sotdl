import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAttribute = async (
  name: string,
  characterId: number,
  subAttributes?: string[]
) => {
  const attribute = await prisma.attribute.create({
    data: {
      name,
      characterId,
    },
  });

  if (!subAttributes) return;

  for (const item of subAttributes) {
    await prisma.subAttribute.create({
      data: {
        type: item,
        attributeId: attribute.id,
      },
    });
  }
};

const handlePost = async (query, body) => {
  try {
    const { id } = await prisma.character.create({
      data: {
        name: "",
        level: "0",
        ancestry: "",
        novice_path: "",
        expert_path: "",
        master_path: "",
      },
    });

    await createAttribute("Strength", id, ["Modifier"]);
    await createAttribute("Agility", id, ["Modifier"]);
    await createAttribute("Intelligence", id, ["Modifier"]);
    await createAttribute("Will", id, ["Modifier"]);
    await createAttribute("Health", id);
    await createAttribute("Defense", id);
    await createAttribute("Perception", id, ["Modifier"]);
    await createAttribute("Insanity", id);
    await createAttribute("Damage", id);
    await createAttribute("Speed", id);
    await createAttribute("Inspiration", id);
    await createAttribute("Corruption", id);
    await createAttribute("Regen", id, ["Multiplier"]);
    await createAttribute("Size", id);
    return await prisma.character.findFirst({
      where: {
        id,
      },
      include: {
        attributes: {
          include: {
            subAttributes: true,
          },
        },
      },
    });
  } catch (e) {
    console.debug(e);
    return;
  }
};

const handleGet = async (query, body) => {
  try {
    return await prisma.character.findMany();
  } catch (e) {
    console.debug(e);
    return;
  }
};

const handledMethods = {
  POST: handlePost,
  GET: handleGet,
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
