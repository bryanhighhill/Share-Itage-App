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
    "registration_date" DATE DEFAULT CURRENT_DATE,
    "admin" BOOLEAN DEFAULT FALSE,
    "family_id" INT REFERENCES "family" NOT NULL,
    "email" VARCHAR (100) NOT NULL,
    "shopping_list" VARCHAR (10000)
);

-- RECIPES TABLE
CREATE TABLE "recipes" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (1000) UNIQUE NOT NULL,
    "ingredients" VARCHAR (10000) NOT NULL,
    "instructions" VARCHAR (10000) NOT NULL,
    "family_id" INT REFERENCES "family" NOT NULL,
    "user_id" INT REFERENCES "user"
);

-- FAVORITES TABLE
CREATE TABLE "favorites" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" NOT NULL,
    "recipe_id" INT REFERENCES "recipes" NOT NULL
);

-- USER REMARKS TABLE
CREATE TABLE "user_remarks" (
    "id" SERIAL PRIMARY KEY,
    "comment" VARCHAR (1000),
    "user_id" INT REFERENCES "user" NOT NULL,
    "recipe_id" INT REFERENCES "recipes" NOT NULL,
);

-- INVITATIONS TABLE
CREATE TABLE "invitations" (
    "id" SERIAL PRIMARY KEY,
    "token" VARCHAR (48) NOT NULL,
    "family_id" INT REFERENCES "family" NOT NULL,
    "exp_date" TIMESTAMP DEFAULT now() + interval '30 minutes';
);