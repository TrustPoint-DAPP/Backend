import express from "express";
import { PORT } from "./config";
import celebAuthRouter from "./routes/celebAuthRouter";
import orgAuthRouter from "./routes/orgAuthRouter";
import http from "http";
import { ChatManager } from "./chatManager";

const app = express();
const server = http.createServer(app);

export const chatManagerInstance = new ChatManager(server);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is listening!" });
});

app.use("/org/auth", orgAuthRouter);
app.use("/celeb/auth", celebAuthRouter);

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
