import mongoose, {Document, Schema} from 'mongoose';
import {ILink} from './link.model';

export interface IUser extends Document {
   email: string;
   password: string;
   links: ILink['_id'];
}

const UserSchema: Schema = new Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      links: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Link',
         },
      ],
   },
);

export default mongoose.model<IUser>('User', UserSchema);
