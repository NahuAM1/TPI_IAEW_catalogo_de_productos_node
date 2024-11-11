import { Injectable } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Injectable()
export class SwaggerManager {
  static initialize(app): void {
    const config = new DocumentBuilder()
      .setTitle('TPI IAEW API-Products')
      .addBearerAuth()
      .setDescription('This is the TPI IAEW API-Products build in Typescript')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('apidocumentation', app, document, {
      swaggerOptions: { tagsSorter: 'alpha', operationsSorter: 'alpha' },
    });
  }
}
