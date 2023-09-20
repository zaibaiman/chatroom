/* eslint-disable @typescript-eslint/no-explicit-any */
import { clone, isNil } from 'lodash';
import { Socket, io } from 'socket.io-client';
import axios from 'axios';
import { environment } from '../../environment';

/**
 *
 */
export interface User {
  /**
   *
   */
  id: string;

  /**
   *
   */
  name: string;
}

/**
 *
 */
export interface Message {
  /**
   *
   */
  id: string;

  /**
   *
   */
  type: 'message' | 'note' | 'file';

  /**
   *
   */
  username: string;

  /**
   *
   */
  file?: any;

  /**
   *
   */
  text?: string;

  /**
   *
   */
  createdAt: number;
}

/**
 *
 */
type UsersChangedListener = (users: User[]) => void;

/**
 *
 */
type MessagesChangedListener = (messages: Message[]) => void;

/**
 *
 */
type ErrorListener = (error: string) => void;

/**
 *
 */
export class ChatRoomService {
  /**
   *
   */
  private static _instance?: ChatRoomService;

  /**
   *
   */
  private socket!: Socket;

  /**
   *
   */
  private username?: string;

  /**
   *
   */
  private usersChangedListeners: UsersChangedListener[] = [];

  /**
   *
   */
  private messagesChangedListeners: MessagesChangedListener[] = [];

  /**
   *
   */
  private errorListeners: ErrorListener[] = [];

  /**
   *
   */
  private users: User[] = [];

  /**
   *
   */
  private messages: Message[] = [];

  /**
   *
   */
  static get instance() {
    if (isNil(this._instance)) {
      this._instance = new ChatRoomService();
    }
    return this._instance;
  }

  /**
   *
   */
  private constructor() {
    this.socket = io('http://localhost:3002');

    this.socket.on('connect', () => {
      if (!isNil(this.username)) {
        this.socket.emit('chatroom:join', this.username);
        if (this.messages.length === 0) {
          this.pullOlderMessages();
        }
      }
    });

    this.socket.on('disconnect', () => {
      console.log('internet connection error...');
    });

    this.socket.on('chatroom:users', (users: User[]) => {
      this.onUsersAdded(users);
    });

    this.socket.on('chatroom:user-added', (user) => {
      this.onUserAdded(user);
    });

    this.socket.on('chatroom:user-removed', (user) => {
      this.onUserRemoved(user);
    });

    this.socket.on('chatroom:message-added', (message) => {
      this.onMessageAdded(message);
    });

    this.socket.on('chatroom:note-added', (note) => {
      this.onNoteAdded(note);
    });

    this.socket.on('chatroom:file-added', (file) => {
      this.onFileAdded(file);
    });
  }

  /**
   *
   * @param username
   */
  join(username: string) {
    this.username = username;
  }

  /**
   *
   * @param text
   */
  sendMessage(text: string) {
    if (this.socket.connected) {
      this.socket.emit('chatroom:add-message', text);
    } else {
      this.fireError('No se pudo enviar mensaje. Conexión a servidor perdida');
    }
  }

  /**
   *
   * @param file
   */
  sendFile(file: File) {
    if (this.socket.connected) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.socket.emit('chatroom:add-file', reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      this.fireError(`Error al enviar archivo '${file.name}'. Conexión a servidor perdida.`);
    }
  }

  /**
   *
   */
  pullOlderMessages() {
    const params = {
      count: 20,
      from: this.messages.length > 0 ? this.messages[0].id : null,
      order: 'older',
    };

    this.socket.emit('chatroom:get-messages', params, (messages: Message[]) => {
      messages.forEach((message) => this.messages.unshift(message));
      this.messagesChangedListeners.forEach((listener) => listener(clone(this.messages)));
    });
  }

  /**
   *
   * @param query
   */
  async search(query: string) {
    const params = { query };
    const searchParams = new URLSearchParams(params);
    const response = await axios.get<Message[]>(`${environment.apiUrl}/search?${searchParams.toString()}`);
    return response.data;
  }

  /**
   *
   * @param id
   * @returns
   */
  async gotoMessage(id: string) {
    const params = { id };
    const searchParams = new URLSearchParams(params);
    const response = await axios.get<Message[]>(`${environment.apiUrl}/find-previous?${searchParams.toString()}`);

    // this.messages.splice(0, this.messages.length);
    // response.data.forEach((message) => this.messages.unshift(message));
    // this.messagesChangedListeners.forEach((listener) => listener(clone(this.messages)));
  }

  /**
   *
   */
  addUsersChangedListener(listener: UsersChangedListener) {
    this.usersChangedListeners.push(listener);
  }

  /**
   *
   * @param listener
   */
  addMessagesChangedListener(listener: MessagesChangedListener) {
    this.messagesChangedListeners.push(listener);
  }

  /**
   *
   * @param listener
   */
  addErrorListener(listener: ErrorListener) {
    this.errorListeners.push(listener);
  }

  /**
   *
   */
  dispose() {
    this.username = undefined;
    this.users = [];
    this.usersChangedListeners = [];
    this.socket.close();
    ChatRoomService._instance = undefined;
  }

  /**
   *
   * @param users
   */
  private onUsersAdded(users: User[]) {
    console.log('Called ChatRoomService.onUsersAdded...', users);

    this.users = users;
    this.usersChangedListeners.forEach((listener) => listener(users));
  }

  /**
   *
   * @param user
   */
  private onUserAdded(user: User) {
    console.log('Called ChatRoomService.onUserAdded...', user);

    this.users.push(user);
    this.usersChangedListeners.forEach((listener) => listener(this.users));
  }

  /**
   *
   * @param user
   */
  private onUserRemoved(user: User) {
    console.log('Called ChatRoomService.onUserRemoved...', user);

    const index = this.users.findIndex((it) => it.id === user.id);
    this.users.splice(index, 1);
    this.usersChangedListeners.forEach((listener) => listener(this.users));
  }

  /**
   *
   * @param message
   */
  private onMessageAdded(message: Message) {
    console.log('Called ChatRoomService.onMessageAdded...', message);
    this.messages.push(message);
    this.messagesChangedListeners.forEach((listener) => listener(clone(this.messages)));
  }

  /**
   *
   * @param note
   */
  private onNoteAdded(note: Message) {
    console.log('Called ChatRoomService.onNoteAdded...', note);
    this.messages.push(note);
    this.messagesChangedListeners.forEach((listener) => listener(clone(this.messages)));
  }

  /**
   *
   * @param file
   */
  private onFileAdded(file: Message) {
    console.log('Called ChatRoomService.onFileAdded...', file);
    this.messages.push(file);
    this.messagesChangedListeners.forEach((listener) => listener(clone(this.messages)));
  }

  /**
   *
   * @param error
   */
  private fireError(error: string) {
    console.log('Called ChatRoomService.fireError...', error);
    this.errorListeners.forEach((listener) => listener(error));
  }
}
