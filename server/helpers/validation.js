
import validator from 'validator';

const validateUsername = (username) => {
  if (username.length < 3) {
    throw new CustomError('Username must be at least 3 characters long', 400);
  }
}

const validateRegistration = (username, email, role,  password) => {
  const errors = [];

  if (!username || !validator.isLength(username, { min: 3, max: 30 })) {
    errors.push('Username must be between 3 and 30 characters long');
  }

    if (!email || !validator.isEmail(email)) {
        errors.push('Invalid email address');
    }

    if (!role || !validator.isIn(role, ['user', 'admin'])) {
        errors.push('Invalid role');
    }

    if (!password || !validator.isLength(password, { min: 8 })) {
        errors.push('Password must be at least 8 characters long');
    }

  return errors;
}

export { validateUsername, validateRegistration };