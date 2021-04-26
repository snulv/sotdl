-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Base',
    "description" TEXT,
    "value" INTEGER NOT NULL DEFAULT 0,
    "max" INTEGER NOT NULL DEFAULT 0,
    "current" INTEGER NOT NULL DEFAULT 0,
    "characterId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Attribute" ("id", "name", "type", "description", "value", "max", "current", "characterId") SELECT "id", "name", "type", "description", "value", "max", "current", "characterId" FROM "Attribute";
DROP TABLE "Attribute";
ALTER TABLE "new_Attribute" RENAME TO "Attribute";
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "ancestry" TEXT NOT NULL,
    "novice_path" TEXT NOT NULL,
    "expert_path" TEXT NOT NULL,
    "master_path" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Character" ("id", "name", "level", "ancestry", "novice_path", "expert_path", "master_path") SELECT "id", "name", "level", "ancestry", "novice_path", "expert_path", "master_path" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
