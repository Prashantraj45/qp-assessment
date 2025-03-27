import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { GroceryItem } from './grocery-items.model';
import { TableBank } from 'src/common/constans';

@Table({ tableName: TableBank.inventory, timestamps: false })
export class Inventory extends Model<Inventory> {
  @Column({ primaryKey: true, autoIncrement: true })
  inventory_id: number;

  @ForeignKey(() => GroceryItem)
  @Column({ type: DataType.INTEGER })
  item_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  stock_level: number;

  @Column({ type: DataType.DATE })
  last_updated: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @BelongsTo(() => GroceryItem)
  groceryItem: GroceryItem;
}
