import cors from "cors";
import express from "express";
import http from "http";

import { ChatManager } from "./chatManager";
import { PORT } from "./config";
import chatRouter from "./routes/chatRouter";
import celebRouter from "./routes/celeb";
import orgRouter from "./routes/organization";
import userRouter from "./routes/userRouter";
import web3EventListeners from "./web3EventListeners";
import dealRouter from "./routes/dealRouter";
import nftRouter from "./routes/nftRouter";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is listening!" });
});

app.use("/org", orgRouter);
app.use("/celeb", celebRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/deal", dealRouter);
app.use("/nft", nftRouter);

web3EventListeners();

// start the http server
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

// start the socket.io server
export const chatManagerInstance = new ChatManager(server);
