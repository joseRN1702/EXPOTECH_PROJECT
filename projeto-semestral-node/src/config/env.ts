import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/projeto-semestral',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
};

export default env;