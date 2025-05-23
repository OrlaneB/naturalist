import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoritesModule } from './favorites/favorites.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [FavoritesModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
