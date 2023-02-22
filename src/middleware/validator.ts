import express, { Application, Request, Response, NextFunction } from "express";

export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    })

    next()
  } catch (error: any) {
    return res.status(400).send(error.errors[0].message)
  }
}