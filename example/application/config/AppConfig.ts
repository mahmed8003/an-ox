/// <reference path="../../app.ts" />

module Sparky {

    export class AppConfig implements OX.AppConfig {

        public config(config:OX.ConfigEnv<OX.AppInfo>):void {

            config.development = {
                name: 'Sparky-Dev',
                enableDatabase: false
            };

            config.production = {
                name: 'Sparky-Pro',
                enableDatabase: false
            };

            config.test = {
                name: 'Sparky-Test',
                enableDatabase: false
            }

        }

    }

}
