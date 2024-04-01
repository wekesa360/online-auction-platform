import userService from '../services/user.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await userService.getUserProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (req, res, next) => {
  try {
    const profile = await userService.createUserProfile(req.user.id, req.body);
    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updatedProfile = await userService.updateUserProfile(req.user.id, req.body);
    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const profile = await userService.getById(req.params.userId);
    res.json(profile);
  } catch (error) {
    next(error);
  }
}

export const deleteProfile = async (req, res, next) => {
  try {
    await userService.deleteUserProfile(req.user.id);
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    next(error);
  }
};