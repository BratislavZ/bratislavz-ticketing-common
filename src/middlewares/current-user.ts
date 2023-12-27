import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT = getJWTFromCookie(req.headers.cookie);
  console.log('JWT', JWT);

  if (!JWT) {
    return next(); // if there is no token, we just return and move on to the next middleware
  }

  try {
    // we already checked for JWT_KEY in index.ts in the startup function
    const payload = jwt.verify(JWT, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};

function getJWTFromCookie(headersCookie?: string) {
  console.log('headersCookie', headersCookie);
  if (!headersCookie) {
    return;
  }
  const cookies = headersCookie.split(';').map((cookie) => {
    const [name, value] = cookie.split('=');
    return { name, value };
  });

  const jwtCookie = cookies.find((cookie) => cookie.name === 'token');
  return jwtCookie?.value;
}
