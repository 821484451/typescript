import { Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({modelName: 'List'})

export default class List extends Model<List> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    public id: number;
    @Column(DataType.CHAR)
    public price: string;
    @Column(DataType.CHAR)
    public sex: string;
    @Column(DataType.CHAR)
    public guige: string;
    @Column(DataType.CHAR)
    public status: string;

}