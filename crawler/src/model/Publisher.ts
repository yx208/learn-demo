import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../sql/sequelize'

class PublisherModel extends Model {}

PublisherModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: DataTypes.STRING(32),
    logo: DataTypes.STRING(64),
    service: DataTypes.STRING(256)
}, {
    sequelize,
    tableName: 'Publisher'
})

export default PublisherModel

