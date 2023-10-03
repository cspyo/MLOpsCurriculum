import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from './common/config/env-vars.interface';
import * as cookieParser from 'cookie-parser';
import { HttpApiExceptionFilter } from './common/filter/http-api-exception.filter';
import { AppModule } from './app/app.module';

class Application {
  private DEV_MODE: boolean;
  private PORT: number;

  private logger = new Logger(Application.name);

  constructor(private server: NestExpressApplication) {
    const config = this.server.get(ConfigService<EnvVars>);
    this.DEV_MODE = config.get('APP_ENV') === 'production' ? false : true;
    this.PORT = config.get('PORT', 4000);
  }

  private async setUpGlobalMiddleware() {
    this.server.enableCors();
    this.server.use(cookieParser());

    this.server.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    this.server.useGlobalInterceptors(
      new ClassSerializerInterceptor(this.server.get(Reflector)),
    );

    this.server.useGlobalFilters(new HttpApiExceptionFilter());
  }

  async bootstrap() {
    await this.setUpGlobalMiddleware();
    await this.server.listen(this.PORT);
  }

  startLog() {
    if (this.DEV_MODE) {
      this.logger.log(`✅ Server on http://localhost:${this.PORT}`);
    } else {
      this.logger.log(`✅ Server on port ${this.PORT}...`);
    }
  }

  errorLog(error: string) {
    this.logger.error(`🆘 Server error ${error}`);
  }
}

async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = new Application(server);
  await app.bootstrap();
  app.startLog();
}

init().catch((error) => {
  new Logger('init').error(error);
});
