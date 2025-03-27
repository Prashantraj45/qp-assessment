import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { TableBank } from 'src/common/constans';
import { User } from './user.model';

@Table({ tableName: TableBank.admin, timestamps: false })
export class Admin extends Model<Admin> {
  @Column({ primaryKey: true, autoIncrement: true })
  admin_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  user_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password_hash: string;
}
