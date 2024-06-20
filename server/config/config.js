import Joi from "joi";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env` });

export const config = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  proxy_url: process.env.REACT_APP_PROXY_URL,
};

export const envVarsSchema = Joi.object({
  client_id: Joi.string().required(),
  client_secret: Joi.string().required(),
  redirect_uri: Joi.string().required(),
  proxy_url: Joi.string().required(),
});

export const { error } = envVarsSchema.validate(config);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const { client_id, client_secret, redirect_uri, proxy_url } = config;
