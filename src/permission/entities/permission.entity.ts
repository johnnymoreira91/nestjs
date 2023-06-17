import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { CreatePermission, PermissionModel } from 'src/models/permissions';
import { User } from 'src/user/entities/user.entity';

@Table({
  tableName: 'permissions',
  schema: 'user-management',
  underscored: true,
  timestamps: true,
})
export class Permissions extends Model<PermissionModel, CreatePermission> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: 'NOW()',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: 'NOW()',
  })
  updatedAt: Date;

  @HasMany(() => User)
  user: User;
}
