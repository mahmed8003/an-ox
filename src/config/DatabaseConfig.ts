/// <reference path="../OX" />

module OX {

    export interface DBInfo {
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

    export interface DatabaseConfig {
        config(config:ConfigEnv<DBInfo>):void;
        connect(info:DBInfo):any;
    }

}
