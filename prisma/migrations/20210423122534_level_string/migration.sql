-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "ancestry" TEXT NOT NULL,
    "novice_path" TEXT NOT NULL,
    "expert_path" TEXT NOT NULL,
    "master_path" TEXT NOT NULL
);
INSERT INTO "new_Character" ("id", "name", "level", "ancestry", "novice_path", "expert_path", "master_path") SELECT "id", "name", "level", "ancestry", "novice_path", "expert_path", "master_path" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
