import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { GroceryItem } from './grocery-items.model';
import { TableBank } from 'src/common/constans';

@Table({ tableName: TableBank.categories, timestamps: false })
export class Category extends Model<Category> {
  @Column({ primaryKey: true, autoIncrement: true })
  category_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @HasMany(() => GroceryItem)
  groceryItems: GroceryItem[];
}
