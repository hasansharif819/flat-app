import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), ".env") });

if (!process.env.SUPER_ADMIN_EMAIL) {
  throw new Error(
    "SUPER_ADMIN_EMAIL is not defined in the environment variables"
  );
}

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_pass_secret: process.env.RESET_PASS_TOKEN,
    reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
  },
  superAdmin: {
    super_admin_username: process.env.SUPER_ADMIN_USERNAME,
    super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  },
  test: {
    admin_email: process.env.ADMIN_EMAIL,
    admin_username: process.env.ADMIN_USERNAME,
    admin_password: process.env.ADMIN_PASSWORD,
    user_username: process.env.USER_USERNAME,
    user_email: process.env.USER_EMAIL,
    user_password: process.env.USER_PASSWORD,
  },

  //Here add your other environment variables
};
