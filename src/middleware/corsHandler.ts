import cors from 'cors';

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL as string]
    : ['http://localhost:5173'];

export const corsHandler = cors({
  origin: allowedOrigins,
  credentials: true,
});
