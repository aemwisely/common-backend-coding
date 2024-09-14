import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

function swaggerDocument(title = '', description = '', version = '1.0.0', tag = ''): Omit<OpenAPIObject, 'paths'> {
  const documentBuilder = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth({ in: 'header', type: 'http' });

  if (tag) {
    documentBuilder.addTag(tag);
  }

  return documentBuilder.build();
}

export default function SwaggerSetup(app: NestExpressApplication, prefix: string, documentName: string) {
  const document = SwaggerModule.createDocument(app, swaggerDocument(documentName, 'description', '', null));

  return SwaggerModule.setup(`${prefix}/docs`, app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}
