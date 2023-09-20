/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Repository } from './repository';
import { UsersManager } from './users.manager';
import * as dotenv from 'dotenv';

/**
 * Load config
 */
dotenv.config();

/**
 *
 */
@WebSocketGateway(parseInt(process.env.WS_PORT), {
  cors: {
    origin: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  /**
   *
   */
  @WebSocketServer()
  private server: Server;

  /**
   *
   * @param usersManager
   */
  constructor(private usersManager: UsersManager, private repository: Repository) {}

  /**
   *
   * @param client
   * @param args
   */
  handleConnection(client: Socket) {
    Logger.log('Called ChatGateway.handleConnection...', {
      clientId: client.id,
    });
  }

  /**
   *
   * @param client
   */
  async handleDisconnect(client: Socket) {
    Logger.log('Called ChatGateway.handleDisconnect...', {
      clientId: client.id,
    });
    const user = this.usersManager.removeUser(client.id);
    this.server.emit('chatroom:user-removed', user);

    const note = await this.repository.addNote(`${user.name} abandono la conversación`, user.name);
    this.server.emit('chatroom:note-added', note);
  }

  /**
   *
   * @param data
   * @param client
   */
  @SubscribeMessage('chatroom:join')
  async onChatRoomJoin(@MessageBody() username: string, @ConnectedSocket() client: Socket) {
    Logger.log('Called ChatGateway.onChatRoomJoin...', {
      clientId: client.id,
      username,
    });

    const user = {
      id: client.id,
      name: username,
    };
    this.usersManager.addUser(user);

    client.emit('chatroom:users', this.usersManager.getAll());
    client.broadcast.emit('chatroom:user-added', user);

    const note = await this.repository.addNote(`${user.name} se unio a la conversación`, user.name);
    this.server.emit('chatroom:note-added', note);
  }

  /**
   *
   * @param text
   * @param client
   */
  @SubscribeMessage('chatroom:add-message')
  async onChatRoomAddMessage(@MessageBody() text: string, @ConnectedSocket() client: Socket) {
    Logger.log('Called ChatGateway.onChatRoomAddMessage...', { text });

    const user = this.usersManager.getById(client.id);
    const message = await this.repository.addMessage(text, user.name);
    this.server.emit('chatroom:message-added', message);
  }

  /**
   *
   * @param text
   * @param client
   */
  @SubscribeMessage('chatroom:add-note')
  async onChatRoomAddNote(@MessageBody() text: string, @ConnectedSocket() client: Socket) {
    const user = this.usersManager.getById(client.id);
    const note = await this.repository.addNote(text, user.name);
    this.server.emit('chatroom:note-added', note);
  }

  /**
   *
   * @param data
   * @param client
   */
  @SubscribeMessage('chatroom:add-file')
  async onChatRoomAddFile(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const user = this.usersManager.getById(client.id);
    const file = await this.repository.addFile(data, user.name);
    this.server.emit('chatroom:file-added', file);
  }

  /**
   *
   * @param data
   * @returns
   */
  @SubscribeMessage('chatroom:get-messages')
  async onChatRoomGetMessages(@MessageBody() data: any) {
    return await this.repository.findOlderMessages(data.from, data.count);
  }
}
