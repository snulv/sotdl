-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "ancestry" TEXT NOT NULL,
    "novice_path" TEXT NOT NULL,
    "expert_path" TEXT NOT NULL,
    "master_path" TEXT NOT NULL
);
