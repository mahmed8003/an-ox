/// <reference path="../OX" />

module OX {

    export interface DBConfig {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        logging?: boolean;
        dialect?: string;
        storage?: string;
        omitNull?: boolean;
        freezeTableName?: boolean;
        maxConcurrentQueries?: number;
        maxConnections?: number;
    }

    export interface EnvDBConfig {
        development: DBConfig;
        test: DBConfig;
        production: DBConfig;
    }

    export interface DatabaseConfig {
        config(config:EnvDBConfig):boolean;
        connect(config:DBConfig):any;
    }

}
