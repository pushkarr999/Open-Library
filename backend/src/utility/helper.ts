import jwt from "jsonwebtoken";
import { EXPRIES_IN } from "./constants";
import { Types } from "mongoose";

function createAccessToken(user_data: {
  email: string;
  _id: string;
  role: number;
}) {
  try {
    const issuer = process.env.ISSUER;
    const audience = process.env.AUDIENCE;
    const secret_key = process.env.ACCESS_KEY;
    if (!!issuer && !!audience && !!secret_key) {
      const signinOptions: jwt.SignOptions = {
        issuer: process.env.ISSUER,
        audience: process.env.AUDIENCE,
        subject: user_data.email,
        expiresIn: EXPRIES_IN,
      };
      return jwt.sign(
        {
          email: user_data.email,
          _id: user_data._id,
          role: user_data.role,
        },
        secret_key,
        signinOptions
      );
    } else {
      throw {
        name: "Token error",
        message: "Some error occured while creating token",
      };
    }
  } catch (error) {
    throw error;
  }
}

function verifyToken(token: string) {
  try {
    const secret_key = process.env.ACCESS_KEY;
    if (!!secret_key) {
      return jwt.verify(token, secret_key as string);
    } else {
      throw {
        name: "Token error",
        message: "Some error occured while verifying token",
      };
    }
  } catch (error) {
    throw error;
  }
}

function getDays(time: number) {
  let s_time = new Date(time * 1000).getTime();
  let e_time = new Date().getTime();

  const days = Math.round(Math.round(e_time - s_time) / (1000 * 3600 * 24));
  console.log("Days ", days);
  return days;
}

export { createAccessToken, verifyToken, getDays };
