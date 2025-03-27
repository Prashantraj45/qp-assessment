import { Module } from '@nestjs/common';
import { ConfModule } from 'src/conifgs/config.module';
import { SqlUserRepository } from './repos/user.repo';
import { REPOENUM } from 'src/common/constans';

@Module({
  imports: [ConfModule],
  providers: [{ provide: REPOENUM.USERREPO, useClass: SqlUserRepository }],
  exports: [REPOENUM.USERREPO],
})
export class RepositoryModule {}
