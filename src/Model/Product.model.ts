import { Table, Model, Column, DataType } from 'sequelize-typescript';
// import { v4 as uuidv4 } from 'uuid';

@Table
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;
}
