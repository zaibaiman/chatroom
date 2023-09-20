import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Model } from 'mongoose';
import { isNil } from 'lodash';

/**
 *
 */
@Injectable()
export class Repository {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  /**
   *
   * @param text
   * @param username
   */
  async addMessage(text: string, username: string) {
    const newMessage = new this.messageModel<Message>({
      type: 'message',
      username,
      text,
      createdAt: Date.now(),
    });
    return (await newMessage.save()).toJSON();
  }

  /**
   *
   * @param text
   * @param username
   * @returns
   */
  async addNote(text: string, username: string) {
    const newMessage = new this.messageModel<Message>({
      type: 'note',
      username,
      text,
      createdAt: Date.now(),
    });
    return (await newMessage.save()).toJSON();
  }

  /**
   *
   * @param data
   * @param username
   * @returns
   */
  async addFile(data: string, username: string) {
    const newMessage = new this.messageModel<Message>({
      type: 'file',
      username,
      file: data,
      createdAt: Date.now(),
    });
    return (await newMessage.save()).toJSON();
  }

  /**
   *
   * @param from
   * @param count
   * @returns
   */
  async findOlderMessages(from: string, count: number) {
    Logger.log('Called Repository.findOlderMessages...', { from, count });

    if (isNil(from)) {
      const messages = await this.messageModel.find().sort({ createdAt: -1 }).limit(count).exec();
      return messages.map((m) => m.toJSON());
    }

    const message = await this.messageModel.findById(from).exec();
    const messages = await this.messageModel
      .find({ createdAt: { $lt: message.createdAt } })
      .sort({ createdAt: -1 })
      .limit(count)
      .exec();

    return messages.map((m) => m.toJSON());
  }

  /**
   *
   * @param text
   */
  async searchWithText(text: string) {
    Logger.log('Called Repository.searchWithText...', { text });
    const docs = await this.messageModel
      .find({
        text: new RegExp(text, 'i'),
      })
      .sort({ createdAt: -1 })
      .exec();
    return docs.map((doc) => doc.toJSON());
  }

  /**
   *
   * @param to
   */
  async findAllPreviousMessages(from: string) {
    Logger.log('Called Repository.findAllPreviousMessages...', { from });

    const message = await this.messageModel.findById(from).exec();
    const messages = await this.messageModel
      .find({ createdAt: { $gte: message.createdAt } })
      .sort({ createdAt: -1 })
      .exec();

    return messages.map((m) => m.toJSON());
  }
}
