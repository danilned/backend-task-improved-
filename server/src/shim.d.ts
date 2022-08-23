declare namespace Express {
  export interface Request {
    jwt?: {
      id: number
    }
  }
}