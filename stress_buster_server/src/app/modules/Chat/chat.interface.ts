// State.ts
import { Document } from 'mongoose'

export type IChat = {
  userId: string
  prompt: string
  timestamp: Date
  response: string
} & Document
