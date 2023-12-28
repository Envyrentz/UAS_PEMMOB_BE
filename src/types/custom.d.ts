import { Request } from 'express';
import { ObjectId } from 'mongoose';

interface CustomRequest extends Request {
  user: {
    username: String;
    _id: String; // Adjust the type based on your user ID type
    // Other user properties if needed
  };
}

export default CustomRequest;