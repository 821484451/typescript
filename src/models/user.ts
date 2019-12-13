import { Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({})

class User extends Model<User> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    public id: number;
    @Column(DataType.CHAR)
    public userName: string;
    @Column(DataType.CHAR)
    public password: string;
    @Column(DataType.CHAR)
    public usercode: string;
    @Column(DataType.INTEGER)
    public status: number;

}
export default User;