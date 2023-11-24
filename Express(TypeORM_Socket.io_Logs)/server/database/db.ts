
import { DataSource } from 'typeorm';
// import { query , error} from 'winston';

const dataSource = new DataSource({
  type: 'mysql',
  host : 'localhost',
  port: 3306,
  username: 'root',
  password: 'harsh', // The password you created when running docker command.
  database: 'User',
  synchronize: true,
  entities: ["entity/**.ts"],
 migrations: [/*...*/],
 migrationsTableName: "custom_migration_table",
//  logging : ["query" , "error"],
//  maxQueryExecutionTime : 10000,
});
// typeorm migration:create /src/migrations/PostRefactoring
dataSource.initialize().then(() => console.log('connected to DB succesfully!')).catch((err)=> console.log(err));

export default dataSource;

// typeorm migration:run -d ./database/db.js
// typeorm migration:run -d /home/my/Desktop/Express_TypeORM_Socket.io/server/database/db.js
// /home/my/Desktop/Express_TypeORM_Socket.io/server/database/db.js
