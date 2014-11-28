/// <reference path="../OX" />

module OX {

    export interface EnvLoggerInfo {
        development: LoggerOptions;
        test: LoggerOptions;
        production: LoggerOptions;
    }

    export interface LoggerConfig {
        config(loggerInfo:EnvLoggerInfo):void;
    }

}
