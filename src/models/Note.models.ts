import { Schema, Types, model } from "mongoose";
import { INote } from "../utils/note.utils";

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      // required: true
    },
  },
  { timestamps: true }
);

const Note = model<INote>("Note", noteSchema);

export default Note;
