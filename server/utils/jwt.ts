import process from 'node:process'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey' // sebaiknya dari .env

export function generateAccessToken(payload: object, expiresIn = '1h') {
  return (jwt as unknown as any).sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET)
}
