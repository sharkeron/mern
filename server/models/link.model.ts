import mongoose, {Document, Schema} from 'mongoose';
import {IUser} from './user.model';

export interface ILink extends Document {
   from: string;
   to: string;
   code: string;
   date: Date;
   clicks: number;
   owner: IUser['_id'];
}

const LinkSchema: Schema = new Schema(
   {
      from: {
         type: String,
         required: true,
      },
      to: {
         type: String,
         required: true,
         unique: true,
      },
      code: {
         type: String,
         required: true,
         unique: true,
      },
      date: {
         type: Date,
         default: Date.now,
      },
      clicks: {
         type: Number,
         default: 0,
      },
      owner: {
         type: Schema.Types.ObjectId,
         ref: 'User',
      },
   },
);

export default mongoose.model<ILink>('Link', LinkSchema);
