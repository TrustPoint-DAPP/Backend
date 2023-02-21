import {
  Celeb,
  MessageType,
  Organization,
  PrismaClient,
  SenderType,
} from "@prisma/client";
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { onlyAuthenticatedSocket } from "./protectionMiddlewares";

const prisma = new PrismaClient();

export class ChatManager {
  io: Server;
  sockets: Record<string, Socket> = {};
  orgToSocket: Record<number, string[]> = {};
  celebToSocket: Record<number, string[]> = {};

  constructor(public server: HttpServer) {
    this.io = new Server(server, { cors: { origin: "*" } });
    this.io.use(onlyAuthenticatedSocket);
    this.io.on("connection", this.initialize.bind(this));
  }

  initialize(socket: Socket) {
    let org: Organization, celeb: Celeb;
    const userType = socket.data.userType as "ORG" | "CELEB";

    this.sockets[socket.id] = socket;

    if (userType == "ORG") {
      org = socket.data.organization as Organization;
      if (!this.orgToSocket[org.id]) this.orgToSocket[org.id] = [socket.id];
      else this.orgToSocket[org.id].push(socket.id);
    } else {
      celeb = socket.data.celeb as Celeb;
      if (!this.celebToSocket[celeb.id])
        this.celebToSocket[celeb.id] = [socket.id];
      else this.celebToSocket[celeb.id].push(socket.id);
    }

    socket.on("send_message", async (data) => {
      try {
        const { to, text } = JSON.parse(data);
        if (!to) return;
        if (userType == "ORG") {
          const celeb = await prisma.celeb.findUnique({ where: { id: to } });
          if (!celeb) return socket.emit("error", "celeb not found");
        } else {
          const organization = await prisma.organization.findUnique({
            where: { id: to },
          });
          if (!organization)
            return socket.emit("error", "organization not found");
        }
        this.sendTextMessage({
          userType,
          fromId: userType == "ORG" ? org.id : celeb.id,
          toId: to,
          text,
          type: MessageType.TEXT,
        });
      } catch (err) {
        return socket.emit("error", "invalid message");
      }
    });
  }

  async sendTextMessage(data: {
    userType: "ORG" | "CELEB";
    fromId: number;
    toId: number;
    text?: string;
    imageCID?: string;
    videoCID?: string;
    type: MessageType;
  }) {
    const receiverSockets =
      (data.userType == "ORG" ? this.celebToSocket : this.orgToSocket)[
        data.toId
      ] || [];
    const senderSockets =
      (data.userType == "ORG" ? this.orgToSocket : this.celebToSocket)[
        data.fromId
      ] || [];
    const allSockets = receiverSockets.concat(senderSockets);

    const messageObj = await prisma.message.create({
      data: {
        org: {
          connect: { id: data.userType == "ORG" ? data.fromId : data.toId },
        },
        celeb: {
          connect: { id: data.userType == "CELEB" ? data.fromId : data.toId },
        },
        sender: data.userType == "CELEB" ? SenderType.CELEB : SenderType.ORG,
        type: data.type,
        text: data.text,
        imageCID: data.imageCID,
        videoCID: data.videoCID,
      },
      include: { org: true, celeb: true },
    });

    allSockets.forEach((socketId) => {
      const socket = this.sockets[socketId];
      socket.emit("message", JSON.stringify(messageObj));
    });
  }

  async sendDeal(orgId: number, celebId: number, dealId: number) {
    const receiverSockets = this.celebToSocket[celebId] || [];
    const senderSockets = this.orgToSocket[orgId] || [];
    const allSockets = receiverSockets.concat(senderSockets);

    const messageObj = await prisma.message.create({
      data: {
        org: { connect: { id: orgId } },
        celeb: { connect: { id: celebId } },
        sender: SenderType.ORG,
        type: MessageType.DEAL,
        deal: { connect: { id: dealId } },
      },
      include: {
        org: true,
        celeb: true,
        deal: { include: { nfts: { include: { metadata: true } } } },
      },
    });

    allSockets.forEach((socketId) => {
      const socket = this.sockets[socketId];
      socket.emit("message", JSON.stringify(messageObj));
    });
  }
}
