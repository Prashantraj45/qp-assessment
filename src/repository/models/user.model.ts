import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Order } from './order.model';
import { TableBank } from 'src/common/constans';

@Table({ tableName: TableBank.users, timestamps: false })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  user_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password_hash: string;

  @HasMany(() => Order)
  orders: Order[];
}
