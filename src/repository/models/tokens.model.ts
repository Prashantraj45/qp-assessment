import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  CreatedAt,
  DataType,
  Sequelize,
} from 'sequelize-typescript';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';
import { TableBank } from 'src/common/constans';

@Table({ tableName: TableBank.tokens, timestamps: false })
export class Token extends Model<Token> {
  @ForeignKey(() => User)
  @Column
  user_id: string;
  
  @PrimaryKey
  @Column
  access_token: string;

  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP + INTERVAL 30 DAY'),
  })
  expires_at: Date;

  @CreatedAt
  @Column
  created_at: Date;

  @Column({ defaultValue: true })
  is_active: boolean;
}
