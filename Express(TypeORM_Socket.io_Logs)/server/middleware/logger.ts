import winston from 'winston';
import { loggers } from 'winston';

const logger = winston.createLogger({
    level : 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )),
    transports : [
        new winston.transports.File(
        {
            filename : 'Logs/error.log',
            level : 'error',
            format : winston.format.logstash()
        }),
        
        new winston.transports.File(
        {
            filename : 'Logs/info.warn',
            level : 'warn',
            format : winston.format.json()
        }),

        new winston.transports.File(
            {
                filename : 'Logs/info',
                level : 'info',
                format : winston.format.json()
            }),
        new winston.transports.File({ filename: "Logs/combined.log" }),
        // Log everything to the console in a simple format
        new winston.transports.Console({ format: winston.format.simple() }),
    ]
})
// $ docker run --name mysql -d \ -p 3306:3306 \ -e MYSQL_ROOT_PASSWORD=harsh \ --restart unless-stopped \mysql:8
/*
    $ docker run --name mysql -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=harsh -e MYSQL_ROOT_HOST='harsh' -e MYSQL_USER=harsh -e MYSQL_DATABASE=Media --restart unless-stopped -d mysql:8  --default-authentication-plugin=mysql_native_password
*/




export default logger