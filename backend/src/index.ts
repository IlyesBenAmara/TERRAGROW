import dotenv from "dotenv";
import express from "express";
import parcelleRouter from "routes/parcelle.router";
import cors from "cors";

dotenv.config();

const PORT: number = +(process.env.PORT || 3000);

const app = express();

// JSON Middleware & Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use("/api/parcelles", parcelleRouter);

app.listen(PORT, () => {
  console.info(`Listening on PORT ${PORT}`);
});
