import { ClientsModule, Transport } from '@nestjs/microservices';

export const ConfigRMQ = ClientsModule.register([
  {
    name: 'PRODUCTS_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RMQ_HOST ?? 'localhost'}:${process.env.RMQ_PORT ?? '5672'}`,
      ],
      queue: 'products-queue',
    },
  },
]);
