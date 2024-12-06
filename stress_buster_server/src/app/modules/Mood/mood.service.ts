import { IMood } from './mood.interface'
import Mood from './mood.model'

const getMoods = async (): Promise<IMood[]> => {
  const result: IMood[] = await Mood.find({})
  return result
}

export const MoodServices = { getMoods }
