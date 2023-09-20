import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/**
 *
 */
export type MessageDocument = HydratedDocument<Message>;

/**
 *
 */
@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Message {
  /**
   *
   */
  @Prop({ required: true })
  type: 'message' | 'note' | 'file';

  /**
   *
   */
  @Prop({ required: true })
  username: string;

  /**
   *
   */
  @Prop({ required: false })
  file?: string;

  /**
   *
   */
  @Prop({ required: false })
  text?: string;

  /**
   *
   */
  @Prop({ required: true, index: true })
  createdAt: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
