import express from "express";
import cors from "cors";
import "./db/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";

const app = express();

// config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Public folder for images
app.use(express.static("public"));

// Routes
app.use("/users", userRoutes);
app.use("/pets", petRoutes);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000!");
});
