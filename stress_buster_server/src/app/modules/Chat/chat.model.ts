import mongoose from 'mongoose'
import { IChat } from './chat.interface'
import { Model } from 'mongoose'

const Schema = mongoose.Schema

const chatSchema = new Schema<IChat>({
  // User information
  userId: {
    type: String,
    required: true,
  },
  // Chat details
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
})

const Chat: Model<IChat & mongoose.Document> = mongoose.model<
  IChat & mongoose.Document
>('Chat', chatSchema)
export default Chat
