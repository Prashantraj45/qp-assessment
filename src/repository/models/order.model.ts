import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { OrderItem } from './order-items.model';
import { User } from './user.model';
import { TableBank } from 'src/common/constans';

@Table({ tableName: TableBank.orders , timestamps: false })
export class Order extends Model<Order> {
  @Column({ primaryKey: true, autoIncrement: true })
  order_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  user_id: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  total_price: number;

  @Column({ type: DataType.STRING, allowNull: false })
  status: string;

  @Column({ type: DataType.DATE })
  created_at: Date;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];
}