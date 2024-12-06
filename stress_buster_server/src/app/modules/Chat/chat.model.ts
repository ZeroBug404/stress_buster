import mongoose from 'mongoose'
import { IChat } from './chat.interface'
import { Model } from 'mongoose'

const Schema = mongoose.Schema

const chatSchema = new Schema<IChat>({
  // User information
  userId: {
    type: String,
  },
  // Chat details
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
  prompt: {
    type: String,
  },
  response: {
    type: String,
  },
})

const Chat: Model<IChat & mongoose.Document> = mongoose.model<
  IChat & mongoose.Document
>('Chat', chatSchema)
export default Chat
