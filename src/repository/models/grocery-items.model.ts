import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from './category.model';
import { Pricing } from './pricing.model';
import { TableBank } from 'src/common/constans';

@Table({ tableName: TableBank.grocery_items, timestamps: false })
export class GroceryItem extends Model<GroceryItem> {
  @Column({ primaryKey: true, autoIncrement: true })
  item_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  category_id: number;

  @Column({ type: DataType.DATE })
  created_at: Date;

  @Column({ type: DataType.DATE })
  updated_at: Date;

  @ForeignKey(() => Pricing)
  @Column({ type: DataType.INTEGER })
  price_id: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Pricing)
  pricing: Pricing;
}
