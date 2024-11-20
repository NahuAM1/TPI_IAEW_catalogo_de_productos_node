import 'dotenv/config';

export const Port = process.env.PORT ?? 3000;
export const BaseUrl = process.env.BASE_URI ?? `localhost:${Port}`;
