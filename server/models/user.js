import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail.js';

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a name'],
    unique: [true, 'Username already exists'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already exists'],
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  revokedTokens: [String], // Array to store revoked tokens
});

UserSchema.set(
  'toJSON',
  {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.password;
    },
  }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const UserProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
  },
  profilePic: {
    type: String,
    required: [true, 'Please provide a profile picture'],
  },
  createdDate: { type: Date, default: Date.now },
});

UserProfileSchema.set(
  'toJSON',
  {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  }
);

export const User = model('User', UserSchema);
export const UserProfile = model('UserProfile', UserProfileSchema);