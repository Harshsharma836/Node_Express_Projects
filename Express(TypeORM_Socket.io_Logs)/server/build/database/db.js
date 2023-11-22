"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'harsh',
    password: 'harsh', // The password you created when running docker command.
    database: 'Media',
    synchronize: true,
    entities: ["../entity/*.ts"],
    migrations: [ /*...*/],
    migrationsTableName: "custom_migration_table",
});
dataSource.initialize().then(() => console.log('connected to DB succesfully!')).catch((err) => console.log(err));
exports.default = dataSource;
// typeorm migration:run -d ./database/db.js
// typeorm migration:run -d /home/my/Desktop/Express_TypeORM_Socket.io/server/database/db.js
// /home/my/Desktop/Express_TypeORM_Socket.io/server/database/db.js
