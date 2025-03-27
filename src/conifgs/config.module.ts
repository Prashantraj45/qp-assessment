import { Module } from '@nestjs/common';
import { ConfigService,ConfigModule} from '@nestjs/config';
import * as MYSQL from 'mysql2/promise';
import { DBENUM } from 'src/common/constans';
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DBENUM,
      useFactory: async (configSerivce: ConfigService) => {
        console.log('connecting to MYSQL Server');
        return MYSQL.createPool({
          host: configSerivce.get<string>('MYSQL_HOST'),
          port: configSerivce.get<number>('MYSQL_PORT'),
          user: configSerivce.get<string>('MYSQL_USER'),
          password: configSerivce.get<string>('MYSQL_PASSWORD'),
          database: configSerivce.get<string>('MYSQL_DATABASE'),
        });
      },
      inject: [ConfigService],
    }
  ],
  exports: [DBENUM],
})
export class ConfModule {}

