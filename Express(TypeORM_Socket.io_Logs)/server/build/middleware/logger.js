"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [
        new winston_1.default.transports.File({
            filename: 'Logs/error.log',
            level: 'error',
            format: winston_1.default.format.logstash()
        }),
        new winston_1.default.transports.File({
            filename: 'Logs/info.log',
            level: 'info',
            format: winston_1.default.format.json()
        }),
        new winston_1.default.transports.File({ filename: "Logs/combined.log" }),
        // Log everything to the console in a simple format
        new winston_1.default.transports.Console({ format: winston_1.default.format.simple() }),
    ]
});
// $ docker run --name mysql -d \ -p 3306:3306 \ -e MYSQL_ROOT_PASSWORD=harsh \ --restart unless-stopped \mysql:8
/*
    $ docker run --name mysql -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=harsh -e MYSQL_ROOT_HOST='harsh' -e MYSQL_USER=harsh -e MYSQL_DATABASE=Media --restart unless-stopped -d mysql:8  --default-authentication-plugin=mysql_native_password
*/
exports.default = logger;
