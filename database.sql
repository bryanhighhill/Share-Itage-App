
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- FAMILY TABLE
CREATE TABLE "family" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100) UNIQUE NOT NULL	
);

-- USER TABLE
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "family_id" INT REFERENCES "family" NOT NULL,
    "registration_date" DATE DEFAULT CURRENT_DATE,
    "admin" BOOLEAN DEFAULT FALSE,
    -- STRETCH
    "icon" VARCHAR(120)
);

-- RECIPES TABLE
CREATE TABLE "recipes" (
    "id" SERIAL PRIMARY KEY,
    "recipe_name" VARCHAR (1000) UNIQUE NOT NULL,
    "ingredients" VARCHAR (10000) NOT NULL,
    "instructions" VARCHAR (10000) NOT NULL,
    -- STRETCH
    "original_image" VARCHAR(120),
    "family_id" INT REFERENCES "family" NOT NULL
);

-- FAVORITES TABLE
CREATE TABLE "favorites" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" NOT NULL,
    "recipes_id" INT REFERENCES "recipes" NOT NULL
);

-- USER REMARKS TABLE - STRETCH
CREATE TABLE "user_remarks" (
    "id" SERIAL PRIMARY KEY,
    "comment" VARCHAR (1000) NOT NULL,
    "memory" VARCHAR (1000) NOT NULL,
    "user_id" INT REFERENCES "user" NOT NULL,
    "recipes_id" INT REFERENCES "recipes" NOT NULL,
    "image" VARCHAR(120)
);

-- IMAGES TABLE - STRETCH
CREATE TABLE "images" (
    "id" SERIAL PRIMARY KEY,
    "recipes_id" INT REFERENCES "recipes" NOT NULL,
    "image" VARCHAR(120)
);