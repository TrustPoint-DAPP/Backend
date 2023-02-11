import express from "express";
import { PORT } from "./config";
import celebAuthRouter from "./routes/celebAuthRouter";
import orgAuthRouter from "./routes/orgAuthRouter";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is listening!" });
});

app.use("/org/auth", orgAuthRouter);
app.use("/celeb/auth", celebAuthRouter);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
