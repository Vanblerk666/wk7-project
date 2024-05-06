import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

// configure dotenv (necessary step for some reason)
dotenv.config();

// Initialise express app
const app = express();
app.use(express.json());
app.use(cors());

// Make a new pool for postgres - set connectionString with the DB then create the new connection pool
const connectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: connectionString });
// should be able to execute SQL queries now!

// make / endpoint
app.get("/", (request, response) => {
  response.json("Have a butchers at this");
});

// make an endpoint for add recipe page
app.get("/addrecipe", async (request, response) => {
  const result = await db.query(
    //now for some SQL - paste join code in backticks
    `
  SELECT

contributors.firstname,
contributors.surname,
ARRAY_AGG(recipes.recipetitle) AS recipes
FROM contributors 
JOIN recipes_junction ON contributors.id = recipes_junction.contributor_id
JOIN recipes ON recipes_junction.contributor_id = recipes.id
GROUP by contributors.firstname, contributors.surname;
  `
  );
  response.json(result.rows);
});

// Check running on port 8080
app.listen(8080, () => console.log("Do we have a connection baby?"));
