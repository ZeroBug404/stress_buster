/* eslint-disable @typescript-eslint/ban-ts-comment */
// const dotenv = require("dotenv");
import { v4 as uuid } from 'uuid'
// const WebSocket = require("ws");
import { WebSocket } from 'ws'
import querystring from 'querystring'
// dotenv.config();
import { startGeminiChat } from '../../../gemini/chat'
import chatHistModel from '../Chat/chat.model'
import { Part } from '@google/generative-ai'
import { NextFunction, Request, Response } from 'express'

const connectWithChatBot = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user === undefined) {
      return
    }
    const foundHist = await chatHistModel
      .find({ userId: req.user })
      .sort({ timestamp: 1 })

    // console.log(foundHist);
    console.log(req.body)

    type GeminiChatHistory = {
      role: 'user' | 'model'
      parts: Part[]
    }

    const foundHistForGemini: GeminiChatHistory[] = []

    for (const conv of foundHist) {
      foundHistForGemini.push({
        role: 'user',
        parts: [
          {
            text: conv.prompt,
          },
        ],
      })
      foundHistForGemini.push({
        role: 'model',
        parts: [
          {
            text: conv.response,
          },
        ],
      })
    }
    // console.log(foundHistForGemini[0]);

    const roomId = uuid()
    const websocketserverLink = `${String(
      process.env.WEBSOCKET_SERVER
    )}?${querystring.stringify({
      id: roomId,
      // serverkey: process.env.WEBSOCKET_SERVER_KEY,
      isServer: true,
    })}`

    const wss = new WebSocket(websocketserverLink)
    wss.on('open', () => {
      // console.log("opn");
      res.status(200).json({ chatId: roomId })
      wss.send(JSON.stringify({ type: 'server:connected' }))
    })

    // Get history from mongo
    //@ts-ignore
    const chat = startGeminiChat(foundHistForGemini)

    wss.on(
      'message',
      async (data: {
        toString: () => string
        type: string
        prompt: string | (string | Part)[] | undefined
      }) => {
        try {
          data = JSON.parse(data.toString())

          console.log(data)

          if (data?.type === 'client:chathist') {
            wss.send(
              JSON.stringify({ type: 'server:chathist', data: foundHist })
            )
          } else if (data?.type === 'client:prompt') {
            if (data.prompt === undefined) {
              // throw err
              return
            }

            // Prompt by the user sent to gemini
            const result = await chat.sendMessageStream(data.prompt)
            let respText = ''
            wss.send(JSON.stringify({ type: 'server:response:start' }))

            console.log(result)

            for await (const chunk of result.stream) {
              const chunkText = chunk.text()

              wss.send(
                JSON.stringify({
                  type: 'server:response:chunk',
                  chunk: chunkText,
                })
              )
              respText += chunkText
            }
            wss.send(JSON.stringify({ type: 'server:response:end' }))
            // should be stored in the db
            await chatHistModel.create({
              userId: req.user,
              prompt: data.prompt,
              response: respText,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    )
    wss.on('close', () => {
      // console.log("cls");
    })
    wss.on('error', error => {
      console.error('WebSocket Error:', error.message)
      res.sendStatus(404)
    })
  } catch (error) {
    console.error(error)
    res.sendStatus(404)
  }
}
export { connectWithChatBot }
