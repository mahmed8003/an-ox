/// <reference path="../OX" />

module OX {

    export interface AppInfo {
        name:string;
        enableDatabase:boolean;
        enableLogger:boolean;
    }

    export interface AppConfig {
        config(config:ConfigEnv<AppInfo>):void;
    }

}

