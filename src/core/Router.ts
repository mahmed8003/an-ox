/// <reference path="../OX" />

module OX {

    export interface RouteData {
        controller: typeof Controller;
        action: string;
    }

    export interface Route {
        path: string;
        method: string;
        routeData: RouteData;
    }

    export class Router {
        public routes:Route[] = [];

        get(path:string, data:RouteData) {
            this.map(path, data, ['GET']);
        }

        post(path:string, data:RouteData) {
            this.map(path, data, ['POST']);
        }

        put(path:string, data:RouteData) {
            this.map(path, data, ['PUT']);
        }

        delete(path:string, data:RouteData) {
            this.map(path, data, ['DELETE']);
        }

        all(path:string, data:RouteData){
            this.map(path, data);
        }

        map(path:string, data:RouteData, methods:string[] = ['GET', 'POST', 'PUT', 'DELETE']) {
            methods.forEach((method) => {
                this.routes.push({path: path, method: method, routeData: data});
            });
        }
    }

    export interface RoutesConfig {
        config(router:Router):void;
    }

}
