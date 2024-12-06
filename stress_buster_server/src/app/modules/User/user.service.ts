// const user = require("../models/User");
// const { genAnalysis } = require("./analysis");
// const report = require("../models/Report");
import { v4 as uuid } from 'uuid'
import User from './user.model'
import { decodeAuthToken } from '../../../firebase/auth'
// const User = require("../models/User");

async function signinwithGoogle(
  req: { headers: { token: any }; cookies: { userid: any } },
  res: {
    status: (arg0: number) => {
      (): any
      new (): any
      json: { (arg0: { message?: string; data?: any }): void; new (): any }
    }
    cookie: (
      arg0: string,
      arg1: string,
      arg2: {
        maxAge: number
        httpOnly: boolean
        sameSite: string
        secure: boolean
      }
    ) => void
  }
) {
  try {
    const token = req.headers.token
    const email = await decodeAuthToken(token)
    console.log(email)
    if (!email) {
      res.status(401).json({ message: 'Invalid Access Token' })
      return
    }
    const data = await User.findOne({ email: email })
    if (req.cookies?.userid) {
      //chat already done
      if (!data) {
        //user not created yet
        const uuid = req.cookies.userid

        //create user account
        const user = await User.create({
          id: uuid,
          email: email,
        })

        res.status(200).json({ data: user })
      } else {
        //user already created
        const data = await User.findOne({ email: email })

        if (data?.id) {
          res.cookie('userid', data.id, {
            maxAge: 1209600000, //14 * 24 * 60 * 60 * 1000 -> 14days
            httpOnly: true,
            sameSite: 'None',
            secure: true,
          })
        }

        res.status(200).json({ data: data })
      }
    } else {
      if (!data) {
        //user not created yet
        const userId = uuid()

        //check this if cookie is being set or not

        res.cookie('userid', userId, {
          maxAge: 1209600000, //14 * 24 * 60 * 60 * 1000 -> 14days
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        })

        const user = await User.create({
          id: userId,
          email: email,
        })
        res.status(200).json({ data: user })
      } else {
        //user already created
        const user = await User.findOne({ email: email })

        if (user?.id) {
          res.cookie('userid', user.id, {
            maxAge: 1209600000, //14 * 24 * 60 * 60 * 1000 -> 14days
            httpOnly: true,
            sameSite: 'None',
            secure: true,
          })
        }

        res.status(200).json({ data: user })
      }
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid Access Token' })
  }
}
async function signup(
  req: { headers: { token: any }; cookies: { userid: any } },
  res: {
    status: (arg0: number) => {
      (): any
      new (): any
      json: {
        (arg0: { message?: string; data?: any; error?: string }): void
        new (): any
      }
    }
    cookie: (
      arg0: string,
      arg1: string,
      arg2: {
        maxAge: number //14 * 24 * 60 * 60 * 1000 -> 14days
        httpOnly: boolean
        sameSite: string
        secure: boolean
      }
    ) => void
  }
) {
  try {
    const token = req.headers.token
    // console.log(req.headers.token+ "here");
    const email = await decodeAuthToken(token)
    console.log(email)
    if (!email) {
      res.status(401).json({ message: 'Invalid Access Token' })
      return
    }
    if (req.cookies?.userid) {
      // console.log(req.cookies.userid);
      //chat already done
      const uuid = req.cookies.userid

      //create user account
      const user = await User.create({
        id: uuid,
        email: email,
      })

      res.status(200).json({ message: 'Account Created' })
    } else {
      //chat not done yet
      //genereate the uuid and return a cookie

      const userId = uuid()

      //check this if cookie is being set or not

      res.cookie('userid', userId, {
        maxAge: 1209600000, //14 * 24 * 60 * 60 * 1000 -> 14days
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })

      const user = await User.create({
        id: userId,
        email: email,
      })

      //we are not creating a report here since there is not analysis till now
      //when the chat is done user will again hit the analysis route
      // we will create report then and store it in the user document

      res.status(200).json({ message: 'Account Created' })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    res.status(401).json({ message: 'Invalid Access Token' })
  }
}

async function login(
  req: { headers: { token: any } },
  res: {
    status: (arg0: number) => {
      (): any
      new (): any
      json: { (arg0: { message?: string; data?: any }): void; new (): any }
    }
    cookie: (
      arg0: string,
      arg1: any,
      arg2: {
        maxAge: number //14 * 24 * 60 * 60 * 1000 -> 14days
        httpOnly: boolean
        sameSite: string
        secure: boolean
      }
    ) => void
  }
) {
  try {
    // const auth = new FirebaseAuth();
    const email = await decodeAuthToken(req.headers.token)
    if (!email) {
      res.status(401).json({ message: 'Invalid Access Token' })
      return
    }
    //get Data from email from database
    const data = await User.findOne({ email: email })

    console.log(data)

    if (data?.id) {
      res.cookie('userid', data.id, {
        maxAge: 1209600000, //14 * 24 * 60 * 60 * 1000 -> 14days
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
    }

    res.status(200).json({ data: data })
  } catch (error) {
    res.status(401).json({ message: 'Invalid Access Token' })
  }
}

async function isUser(
  req: { cookies: { userid: any } },
  res: {
    status: (arg0: number) => {
      (): any
      new (): any
      json: { (arg0: { message?: string; error?: string }): void; new (): any }
    }
  }
) {
  try {
    // console.log(req.cookies);
    if (req.cookies?.userid) {
      const userid = req.cookies?.userid
      // console.log(userid);
      const user = await User.find({ id: userid })
      // console.log(user, "Here");
      if (user?.length != 0) {
        res.status(200).json({ message: 'User validated' })
      } else {
        res.status(401).json({ error: 'Logged Out' })
      }
    } else {
      res.status(401).json({ error: 'Logged Out' })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    res.status(401).json({ error: 'Logged Out' })
  }
}

async function logout(
  req: { cookies: { userid: any } },
  res: {
    status: (arg0: number) => {
      (): any
      new (): any
      json: { (arg0: { Error?: string; msg?: string }): void; new (): any }
    }
    cookie: (
      arg0: string,
      arg1: null,
      arg2: {
        maxAge: number
        httpOnly: boolean
        sameSite: string
        secure: boolean
      }
    ) => void
  }
) {
  if (!req.cookies?.userid) {
    res.status(401).json({ Error: 'UserId not found' })
    return
  }
  res.cookie('userid', null, {
    maxAge: 0,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  })
  res.status(200).json({ msg: 'loggedout' })
}

export { signup, login, isUser, logout, signinwithGoogle }
