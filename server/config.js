import { config as envConfig} from 'dotenv';

envConfig();

const config= {
    mongoDBUri: process.env.MONGODB_URI || 'your_default_mongodb_uri',
    jwtSecret: process.env.SECRET_KEY || 'your_default_secret_key',
    port: process.env.PORT || 8000,
    jwtExpiration: process.env.JWT_EXPIRATION || '1d',
  };
  

export default config;
