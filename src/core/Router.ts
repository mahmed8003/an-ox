/// <reference path="../OX" />

module OX {

    export interface Route {
        method: string;
        path: string;
        controller: typeof Controller;
        action: string;
        filters: Array<typeof ActionFilter>;
    }

    export class Router {
        public routes:Route[] = [];
        public globalFilters:Array<typeof ActionFilter> = [];
        private _:any = require('underscore');


        addGlobalFilters(filters:Array<typeof ActionFilter>):void {
            this.globalFilters = _.union(this.globalFilters, filters);
        }

        get(path:string, controller:typeof Controller, action:string, filters:Array<typeof ActionFilter> = []):void {
            this.map(path, controller, action, filters, ['GET']);
        }

        post(path:string, controller:typeof Controller, action:string, filters:Array<typeof ActionFilter> = []):void {
            this.map(path, controller, action, filters, ['POST']);
        }

        put(path:string, controller:typeof Controller, action:string, filters:Array<typeof ActionFilter> = []):void {
            this.map(path, controller, action, filters, ['PUT']);
        }

        delete(path:string, controller:typeof Controller, action:string, filters:Array<typeof ActionFilter> = []):void {
            this.map(path, controller, action, filters, ['DELETE']);
        }

        all(path:string, controller:typeof Controller, action:string, filters:Array<typeof ActionFilter> = []):void {
            this.map(path, controller, action, filters);
        }

        map(path:string, controller:typeof Controller, action:string, filters:Array<typeof ActionFilter> = [], methods:string[] = ['GET', 'POST', 'PUT', 'DELETE']):void {
            methods.forEach((method) => {
                    var route:Route = {
                        method: method,
                        path: path,
                        controller: controller,
                        action: action,
                        filters: filters
                    };
                    this.routes.push(route);
                }
            );
        }


    }

}
