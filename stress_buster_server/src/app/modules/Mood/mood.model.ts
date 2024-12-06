// main.ts
import mongoose, { Document, Model, Schema } from 'mongoose'
import { IMood } from './mood.interface';

const moodSchema = new Schema<IMood>(
  {
    moodText: {
      type: String,
    },
    activitySuggestion: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const Mood: Model<Document & IMood> = mongoose.model('Mood', moodSchema)
export default Mood;
