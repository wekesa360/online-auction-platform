import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User as UserModel, UserProfile as UserProfileModel } from '../models/user.js';
import config from '../config.js';
import { validateUsername } from '../helpers/validation.js';
import CustomError from '../helpers/custom-error.js';

export const userService = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  _delete,
  revokeToken,
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
};

async function authenticate({ username, password }) {
  const user = await UserModel.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user.id);
    return {
      ...user.toJSON(),
      token,
    };
  }

  throw new CustomError('Invalid username or password', 401);
}

async function getAll() {
  return await UserModel.find();
}

async function getById(id) {
  return await UserModel.findById(id);
}

async function create(userParam) {
  // Validate username
  await validateUsername(userParam.username);

  const user = new UserModel(userParam);

  // Hash password
  if (userParam.password) {
    user.password = await bcrypt.hash(userParam.password, 10);
  }

  // Save user
  await user.save();
}

async function update(id, userParam) {
  const user = await UserModel.findById(id);

  // Validate username
  if (!user) throw new CustomError('User not found', 404);
  await validateUsername(userParam.username, user.username);

  // Hash password if it was entered
  if (userParam.password) {
    userParam.password = await bcrypt.hash(userParam.password, 10);
  }

  // Copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await UserModel.findByIdAndDelete(id);
}

async function revokeToken(userId, token) {
  const user = await UserModel.findById(userId);
  if (!user) throw new CustomError('User not found', 404);

  user.revokedTokens.push(token);
  await user.save();
}

function generateToken(userId) {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtExpiration });
}

async function getUserProfile(userId) {
    const user = await UserModel.findById(userId);
    if (!user) throw new CustomError('User not found', 404);
  
    const profile = await UserProfileModel.findOne({ user: userId });
    return profile;
  }
  
  async function createUserProfile(userId, profileData) {
    const user = await UserModel.findById(userId);
    if (!user) throw new CustomError('User not found', 404);
  
    const profile = new UserProfileModel({ user: userId, ...profileData });
    await profile.save();
    return profile;
  }
  
  async function updateUserProfile(userId, profileData) {
    const user = await UserModel.findById(userId);
    if (!user) throw new CustomError('User not found', 404);
  
    const profile = await UserProfileModel.findOneAndUpdate(
      { user: userId },
      profileData,
      { new: true, runValidators: true }
    );
    return profile;
  }
  
  async function deleteUserProfile(userId) {
    const user = await UserModel.findById(userId);
    if (!user) throw new CustomError('User not found', 404);
  
    await UserProfileModel.findOneAndDelete({ user: userId });
  }

export default userService;