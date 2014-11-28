/// <reference path="../OX" />

module OX {

    export interface LoggerInstance extends NodeJS.EventEmitter {
        extend(target:any): LoggerInstance;

        log(level:string, msg:string, meta:any, callback?:(err:Error, level:string, msg:string, meta:any) => void): LoggerInstance;
        log(level:string, msg:string, callback?:(err:Error, level:string, msg:string, meta:any) => void): LoggerInstance;

        debug(msg:string, meta:any, callback?:(err:Error, level:string, msg:string, meta:any) => void): LoggerInstance;
        debug(msg:string, callback?:(err:Error, level:string, msg:string, meta:any) => void): LoggerInstance;

        info(msg:string, meta:any, callback?:(err:Error, level:string, msg:string, meta:any) => void): LoggerInstance;
        info(msg:string, callback?:(err:Error, level:string, msg:string, meta:any) => void): LoggerInstance;

        warn(msg:string, meta:any, callback?:(err:Error, level:string, msg:string, meta:any) => void): LoggerInstance;
        warn(msg:string, callback?:(err:Error, level:string, msg:string, meta:any) => void): LoggerInstance;

        error(msg:string, meta:any, callback?:(err:Error, level:string, msg:string, meta:any) => void): LoggerInstance;
        error(msg:string, callback?:(err:Error, level:string, msg:string, meta:any) => void): LoggerInstance;


        stream(options?:any): NodeJS.ReadableStream;
        close(): void;

        clear(): void;
    }

    export interface TransportOptions {
        handleExceptions?:boolean;
        json?:boolean
    }

    export interface ConsoleTransportOptions extends TransportOptions {
        level?:string;
        silent?:boolean;
        colorize?:boolean;
        timestamp?:boolean;
    }

    export interface FileTransportOptions extends ConsoleTransportOptions {
        filename:string;
        maxsize:number;
        maxFiles:number;
        stream:any;
    }

    export interface DailyRotateFileTransportOptions extends FileTransportOptions {
        datePattern:string;
    }

    export interface HttpTransportOptions extends TransportOptions {
        host:string;
        port:number;
        path:string;
        auth:{username:string; password:string};
        ssl:boolean;
    }

    export class Transport {
        transportOptions:TransportOptions;

        constructor(options:TransportOptions) {
            this.transportOptions = options;
        }
    }

    export class ConsoleTransport extends Transport {
        constructor(options:ConsoleTransportOptions) {
            super(options);
        }
    }

    export class FileTransport extends Transport {
        constructor(options:FileTransportOptions) {
            super(options);
        }
    }

    export class DailyRotateFileTransport extends Transport {
        constructor(options:DailyRotateFileTransportOptions) {
            super(options);
        }
    }

    export class HttpTransport extends Transport {
        constructor(options:HttpTransportOptions) {
            super(options);
        }
    }

    export interface LoggerOptions {
        transports: Transport[];
        exitOnError?: boolean;
    }


    export class WinstonLogger {

        public createLogger(config:LoggerOptions) {
            var transports:any[] = [];
            var winston:any = require('winston');

            config.transports.forEach((t) => {
                var transportsObj:any = null;
                if (t instanceof ConsoleTransport) {
                    transportsObj = new winston.transports.Console(t.transportOptions);
                } else if (t instanceof FileTransport) {
                    transportsObj = new winston.transports.File(t.transportOptions);
                } else if (t instanceof DailyRotateFileTransport) {
                    transportsObj = new winston.transports.DailyRotateFile(t.transportOptions);
                } else if (t instanceof HttpTransport) {
                    transportsObj = new winston.transports.Http(t.transportOptions);
                }

                if (transportsObj != null) {
                    transports.push(transportsObj);
                }
            });

            var options = {
                transports: transports,
                exitOnError: config.exitOnError
            };

            OX.Log = new winston.Logger(options);
        }

    }


    export var Log:LoggerInstance;
}
