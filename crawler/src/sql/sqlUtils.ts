import { sequelize } from "./sequelize";

async function testDatabaseConnecting() {
    try {
        await sequelize.authenticate()
        console.log('Database connecting successfully.')
    } catch (err) {
        console.log('Database connecting fail. Error is: ', err)
    }
}

export {
    testDatabaseConnecting
}
