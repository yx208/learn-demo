const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
const sequelize = require('../database/db')
const { PERMISSION } = require('../utils/enum')
const { NotFount } = require('../middlewares/httpExecption')


class User extends Model {
    static async verifyPassword(account, plainPassword) {

        // 寻找用户
        const user = await User.findOne({where: { account }})
        if (!user) throw new NotFount('账号或密码错误')

        // 判断密码是否正确
        const isCorrect = bcrypt.compareSync(plainPassword, user.password)
        if (!isCorrect) throw new NotFount('账号或密码错误')

        return user
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    account: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(10)
            const pw = bcrypt.hashSync(value, salt)

            this.setDataValue('password', pw)
        }
    },
    permission: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: PERMISSION.GENERAL
    }
}, {
    sequelize,
    tableName: 'user'
})

module.exports = User
