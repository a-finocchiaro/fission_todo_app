import { Request, Response } from "express"
import { TodoService } from "./todo.service"
import mongoose from "mongoose"
import { ITodoDocument } from "./todo"
import * as fs from "fs"

// read the mongodb secret
const MONGO_URI = fs.readFileSync("/secrets/fission/mongodb-uri/MONGO_URI", "utf-8")

mongoose.connect(MONGO_URI)

type ServiceResponse = ITodoDocument | ITodoDocument[] |  { deletedCount: number }

interface ApiReponse {
  status: number
  body?: ServiceResponse
}

module.exports.todo = async function(context: {request: Request, response: Response }): Promise<ApiReponse> {
  const method = context.request.method

  let data: ServiceResponse

  switch (method) {
    case 'GET': {
      const id = context.request.headers['x-fission-params-id'] as string

      if (id) {
        data = await TodoService.getOne(id)
        break
      }

      // list all
      data = await TodoService.getAll()
      break
    }

    case 'POST': {
      const id = context.request.headers['x-fission-params-id'] as string

      if (id) {
        data = await TodoService.update(id, context.request.body)
        break
      }

      data = await TodoService.create(context.request.body)
      break
    }

    case 'DELETE': {
      const id = context.request.headers['x-fission-params-id'] as string

      data = await TodoService.delete(id)
      break
    }

    default: {
      return {
        status: 405
      }
    }
  }

  return {
    status: 200,
    body: data
  }
}
