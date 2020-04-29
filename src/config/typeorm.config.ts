import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "admin",
  port: 5432,
  synchronize: true,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  database: "taskmanagement"
};
