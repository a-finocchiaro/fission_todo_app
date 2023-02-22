import { ITodoDocument, TodoModel } from "./todo"

export class TodoService {
  static async create(data: any): Promise<ITodoDocument> {
    return await TodoModel.create(data)
  }

  static async getAll(): Promise<ITodoDocument[]> {
    return await TodoModel.find()
  }

  static async getOne(id: string): Promise<ITodoDocument> {
    const todo = await TodoModel.findById(id)

    if (!todo) {
      throw new Error("Todo not found")
    }

    return todo
  }

  static async delete(id: string): Promise<{ deletedCount: number }> {
    const todo = await TodoModel.findById(id)

    if (!todo) {
      throw new Error("Todo not found")
    }

    return await TodoModel.deleteOne({ id: id })
  }

  static async update(id: string, fields: ITodoDocument): Promise<ITodoDocument> {
    const todo = await this.getOne(id)

    await todo.update(fields)

    return await this.getOne(id)
  }
}
