import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { CreateUser, UserModel } from 'src/models/users';
// import { Permissions } from 'src/permission/entities/permission.entity';

@Table({
  tableName: 'users',
  schema: 'user-management',
  underscored: true,
  timestamps: true,
})
export class User extends Model<UserModel, CreateUser> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  publicId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  superUser: boolean;

  // @ForeignKey(() => Permissions)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    onUpdate: 'CASCADE',
    references: {
      key: 'id',
      model: 'Permissions',
    },
  })
  roleId: number;

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
}