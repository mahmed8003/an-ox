/// <reference path="../../app.ts" />

module Sparky {

    export class RoutesConfig implements OX.RoutesConfig {

        public config(router:OX.Router):void {

            //router.addGlobalFilters([AuthFilter]);

            router.get({path:'/', controller:HomeController, action:'index', filters:[AuthFilter]});
        }
    }
}
