import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { GroceryItem } from './grocery-items.model';
import { TableBank } from 'src/common/constans';

@Table({ tableName: TableBank.pricing, timestamps: false })
export class Pricing extends Model<Pricing> {
  @Column({ primaryKey: true, autoIncrement: true })
  price_id: number;

  @ForeignKey(() => GroceryItem)
  @Column({ type: DataType.INTEGER })
  item_id: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  discount: number;

  @Column({ type: DataType.DATE })
  effective_from: Date;

  @Column({ type: DataType.DATE })
  effective_to: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @BelongsTo(() => GroceryItem)
  groceryItem: GroceryItem;
}