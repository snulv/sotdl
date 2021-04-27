/*
  Warnings:

  - You are about to drop the column `max` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `current` on the `Attribute` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "SubAttribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'Base',
    "description" TEXT,
    "value" INTEGER NOT NULL DEFAULT 0,
    "attributeId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("attributeId") REFERENCES "Attribute" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Base',
    "description" TEXT,
    "value" INTEGER NOT NULL DEFAULT 0,
    "characterId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Attribute" ("id", "name", "type", "description", "value", "characterId", "updatedAt") SELECT "id", "name", "type", "description", "value", "characterId", "updatedAt" FROM "Attribute";
DROP TABLE "Attribute";
ALTER TABLE "new_Attribute" RENAME TO "Attribute";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
