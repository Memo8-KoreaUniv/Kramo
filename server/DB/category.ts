import { Document, Model, Types, model, Schema, Date } from 'mongoose'
import { UserDocument } from './user'

/* https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1 */
// Schema
const CategorySchema = new Schema<CategoryDocument, CategoryModel>({
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export interface Category {
  name: string
  user?: Types.ObjectId | Record<string, unknown>
  created_at: Date
}

interface CategoryBaseDocument extends Category, Document {}
export interface CategoryDocument extends CategoryBaseDocument {
  user: UserDocument['_id']
}
export interface CategoryModel extends Model<CategoryDocument> {}

// Default export
export default model<CategoryDocument, CategoryModel>(
  'Category',
  CategorySchema,
)
