import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { GroceryItem } from './grocery-items.model';
import { Pricing } from './pricing.model';
import { Order } from './order.model';
import { TableBank } from 'src/common/constans';

@Table({ tableName: TableBank.order_items, timestamps: false })
export class OrderItem extends Model<OrderItem> {
  @Column({ primaryKey: true, autoIncrement: true })
  order_item_id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  order_id: number;

  @ForeignKey(() => GroceryItem)
  @Column({ type: DataType.INTEGER })
  item_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @ForeignKey(() => Pricing)
  @Column({ type: DataType.INTEGER })
  price_id: number;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => GroceryItem)
  groceryItem: GroceryItem;

  @BelongsTo(() => Pricing)
  pricing: Pricing;
}
