import mongoose from "mongoose";


export interface ITodoDocument extends mongoose.Document {
  name: string
}

const TodoSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String },
});

export const TodoModel = mongoose.model<ITodoDocument>("Todo", TodoSchema)
