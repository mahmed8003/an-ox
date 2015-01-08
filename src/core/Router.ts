/// <reference path="../OX" />

module OX {

    export interface Route {
        method: string;
        path: string;
        controller: typeof Controller;
        action: string;
        filters: Array<typeof ActionFilter>;
    }

    export interface RouteInfo {
        path:string;
        controller:typeof Controller;
        action:string;
        filters?:Array<typeof ActionFilter>;
    }

    export class Router {
        public routes:Route[] = [];
        public globalFilters:Array<typeof ActionFilter> = [];
        private _:any = require('underscore');


        public addGlobalFilters(filters:Array<typeof ActionFilter>):void {
            this.globalFilters = this._.union(this.globalFilters, filters);
        }

        public get(routeInfo:RouteInfo):void {
            this.map(routeInfo, ['GET']);
        }

        public post(routeInfo:RouteInfo):void {
            this.map(routeInfo, ['POST']);
        }

        public put(routeInfo:RouteInfo):void {
            this.map(routeInfo, ['PUT']);
        }

        public delete(routeInfo:RouteInfo):void {
            this.map(routeInfo, ['DELETE']);
        }

        public all(routeInfo:RouteInfo):void {
            this.map(routeInfo);
        }

        private map(routeInfo:RouteInfo, methods:string[] = ['GET', 'POST', 'PUT', 'DELETE']):void {
            methods.forEach((method) => {
                    var route:Route = {
                        method: method,
                        path: routeInfo.path,
                        controller: routeInfo.controller,
                        action: routeInfo.action,
                        filters: routeInfo.filters || []
                    };
                    this.routes.push(route);
                }
            );
        }


    }

}
