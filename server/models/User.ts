//import mongoose, {Schema, Types, Document} from 'mongoose';
import mongoose, {Document, Schema} from 'mongoose';

interface IUser extends Document {
   email: string;
   password: string;
   //links: Link['link'];
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
      //links: [
      //   {
      //      type: Types.ObjectId,
      //      ref: 'Link',
      //   },
      //],
   },
);

export default mongoose.model<IUser>('User', UserSchema);
