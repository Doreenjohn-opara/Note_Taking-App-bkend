import mongoose, { Schema, model } from 'mongoose';
import { ICollaboration } from '../utils/collaboration.utils';

const CollaborationSchema: Schema = new Schema ({
  noteId: { type: String, required: true },
  users: [{ type: String, required: true }],
});

const Collaboration = mongoose.model<ICollaboration>('Collaboration', CollaborationSchema);

export default Collaboration;