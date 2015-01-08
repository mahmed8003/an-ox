/// <reference path="../../app.ts" />

module Sparky {

    export class LoggerConfig implements OX.LoggerConfig {

        public config(config:OX.ConfigEnv<OX.LoggerOptions>):void {

            config.development = {
                transports: [new OX.ConsoleTransport({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                })],
                exitOnError: true
            };

            config.production = {
                transports: [new OX.ConsoleTransport({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                })],
                exitOnError: true
            }

            config.test = {
                transports: [new OX.ConsoleTransport({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                })],
                exitOnError: true
            };


        }
    }
}
