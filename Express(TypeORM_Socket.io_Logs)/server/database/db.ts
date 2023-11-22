import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host : 'localhost',
  port: 3306,
  username: 'root',
  password: 'harsh', // The password you created when running docker command.
  database: 'User',
  synchronize: true,
  entities: ["entity/*.ts"],
 migrations: [/*...*/],
 migrationsTableName: "custom_migration_table",
});

dataSource.initialize().then(() => console.log('connected to DB succesfully!')).catch((err)=> console.log(err));

export default dataSource;

// typeorm migration:run -d ./database/db.js
// typeorm migration:run -d /home/my/Desktop/Express_TypeORM_Socket.io/server/database/db.js
// /home/my/Desktop/Express_TypeORM_Socket.io/server/database/db.js
