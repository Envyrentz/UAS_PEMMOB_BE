// db/prompt.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Prompt extends Document {
  title: string;
  content: string;
  authorId: String;
  authorName: string;
  tags: string[];
}

const promptSchema = new Schema<Prompt>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const PromptModel = mongoose.model<Prompt>('Prompt', promptSchema);

export default PromptModel;
