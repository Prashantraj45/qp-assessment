import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfModule } from 'src/conifgs/config.module';
import { InventoryModule } from 'src/modules/Inventory/inventory.module';
import { OrderModule } from 'src/modules/order/order.module';
import { UserModule } from 'src/modules/user/user.module';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfModule,
    UserModule,
    OrderModule,
    InventoryModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
