// State.ts
import { Document } from 'mongoose'

export type IMood = {
  moodText: string
  activitySuggestion: string
} & Document
