import dotenv from 'dotenv';
dotenv.config();

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    EXPO_PUBLIC_URL: process.env.EXPO_PUBLIC_SOCKET_URL,
  },
});
