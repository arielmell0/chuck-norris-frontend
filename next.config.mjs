/** @type {import('next').NextConfig} */
import { config } from 'dotenv';
config();

const nextConfig = {
  env: {
    CHUCK_NORRIS_GATEWAY_URL: process.env.CHUCK_NORRIS_GATEWAY_URL,
  },
};

export default nextConfig;
