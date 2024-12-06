import { NextFunction, Request, Response } from 'express'

import sendResponse from '../../../utils/responseHandler'
import { MoodServices } from './mood.service'

const getAllMoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await MoodServices.getMoods()
    // console.log(result)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Successfully fetched all modds',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const MoodControllers = { getAllMoods }
