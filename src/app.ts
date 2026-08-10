import express from "express";
import router from "./routes/posts.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://permana-blog-front.vercel.app",
      "https://www.permana.com.br",
      "https://permana.com.br",
    ],
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "Permana Blog API" });
});

app.use("/posts", router);
app.use((req, res) => {
  res.status(404).send("Not found");
});

export default app;
