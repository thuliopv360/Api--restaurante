import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TableModule } from './table/table.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [UsersModule, ProductsModule, TableModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
