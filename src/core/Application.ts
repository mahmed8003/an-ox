/// <reference path="../OX" />

/*

 String root;
 dynamic host;
 int port;
 String env;
 AppInfo appInfo;
 DBInfo dbInfo;
 LoggerInfo loggerInfo;
 final Router router = new Router();
 */

module OX {

    export interface AppContext {
        root:string;
        port:number;
        env:string;
        appInfo:AppInfo;
        dbInfo:DBInfo;
        db?:any;
        router:Router;
        getModel(name:typeof Model): typeof Model;
    }

    export class Application implements AppContext {

        // app config
        root:string;
        port:number;
        env:string;
        appInfo:AppInfo;
        dbInfo:DBInfo;
        db:any;
        router:Router;

        //private stuff
        private models:Array<typeof Model>;
        private express;

        // u = User configurations
        private uAppConfig:AppConfig;
        private uDatabaseConfig:DatabaseConfig;
        private uExpressConfig:ExpressConfig;
        private uLoggerConfig:LoggerConfig;
        private uRoutesConfig:RoutesConfig;


        //
        private _:any = require('underscore');
        private path:any = require('path');


        constructor(root:string, env:string, port:number) {
            this.root = root;
            this.env = env;
            this.port = port;

            this.router = new OX.Router();
            this.models = [];
        }

        public setAppConfig(config:AppConfig):void {
            this.uAppConfig = config;
        }

        public setDatabaseConfig(config:DatabaseConfig):void {
            this.uDatabaseConfig = config;
        }

        public setExpressConfig(config:ExpressConfig):void {
            this.uExpressConfig = config;
        }

        public setLoggerConfig(config:LoggerConfig):void {
            this.uLoggerConfig = config;
        }

        public setRoutesConfig(config:RoutesConfig):void {
            this.uRoutesConfig = config;
        }

        private configureApp():void {
            var cfg = {
                development: null,
                test: null,
                production: null
            };
            this.uAppConfig.config(cfg);
            this.appInfo = cfg[this.env];
        }

        private configureDatabase():void {
            var cfg = {
                development: null,
                test: null,
                production: null
            };
            this.uDatabaseConfig.config(cfg);
            this.dbInfo = cfg[this.env];
            if (this.appInfo.enableDatabase) {
                this.db = this.uDatabaseConfig.connect(this.dbInfo);
            }
        }

        private configureExpress():void {
            this.uExpressConfig.config(this.express);
        }

        private configureLogger():void {
            var cfg = {
                development: null,
                test: null,
                production: null
            };
            this.uLoggerConfig.config(cfg);

            var loggerInfo = cfg[this.env];
            var logger = new WinstonLogger();
            logger.createLogger(loggerInfo);
        }

        private configureRoutes():void {
            this.uRoutesConfig.config(this.router);
        }

        private configureModels():void {
            this.models.forEach((m) => {
                m.configure();
            });
        }


        public giddup() {
            this.configureApp();
            this.configureLogger();
            this.configureDatabase();
            this.configureModels();
            this.configureRoutes();
            this.buildExpress();
            this.configureExpress();
            this.buildRoutes();

            var self = this;
            var http:any = require('http');
            http.createServer(this.express).listen(this.port, function () {
                Log.info('OX is running at port ' + self.port + ' in ' + self.env + ' environment');
            });
        }

        public addModel(model:typeof Model):Application {
            this.models.push(model);
            return this;
        }

        public getModel(model:typeof Model):typeof Model {
            var modelClass = this._.find(this.models, function (m) {
                return m == model
            });
            return modelClass;
        }

        private buildExpress() {
            var express = require('express');
            this.express = express();

            this.express.set('env', this.env);
            this.express.set('port', this.port);
            this.express.set('views', this.path.join(this.root, '../application/views'));
            this.express.set('view engine', 'ejs');
            // Showing stack errors
            this.express.set('showStackError', true);

            var self = this;
            this.express.use(function (req, res, next) {
                var requestContext:RequestContext = new RequestContext(self);
                req._requestContext = requestContext;
                next();
            });

            var morgan:any = require("morgan");
            this.express.use(morgan('dev', {
                stream: {
                    write: function (str) {
                        Log.debug(str);
                    }
                }
            }));


            // Environment dependent middleware
            if (this.env === 'development') {
                // Disable views cache
                this.express.set('view cache', false);
            } else if (this.env === 'production') {
                // Enable views cache
                this.express.locals.cache = 'memory';
            }

            var bodyParser:any = require('body-parser');
            var methodOverride:any = require('method-override');
            // Request body parsing middleware should be above methodOverride
            this.express.use(bodyParser.urlencoded({
                extended: true
            }));
            this.express.use(bodyParser.json());
            this.express.use(methodOverride());
            // Enable jsonp
            this.express.enable('jsonp callback');
            // CookieParser should be above session
            var cookieParser:any = require('cookie-parser');
            this.express.use(cookieParser());
            // connect flash for flash messages
            var flash:any = require('connect-flash');
            this.express.use(flash());
            // Use helmet to secure Express headers
            var helmet:any = require('helmet');
            this.express.use(helmet.xframe());
            this.express.use(helmet.xssFilter());
            this.express.use(helmet.nosniff());
            this.express.use(helmet.ienoopen());
            this.express.disable('x-powered-by');
            // Should be placed before express.static
            var compress:any = require('compression');
            this.express.use(compress());
            // Setting the this.express router and static folder
            var favicon:any = require('serve-favicon');
            this.express.use(favicon(this.path.join(this.root, '../public/images/favicon.ico')));
            this.express.use(express.static(this.path.join(this.root, '../public')));
        }

        private buildRoutes() {
            var self = this;
            this.router.routes.forEach((route) => {

                var filters:Array<typeof ActionFilter> = this.router.globalFilters;
                filters = this._.union(filters, route.filters);

                var controller:typeof Controller = route.controller;

                if (!controller.isConfigured) {
                    controller.configure();
                    controller.isConfigured = true;

                }

                var method:string = route.method;
                var action:string = route.action;
                var handlers:any = this.getRequestHandlersForFilterTypes(filters);

                var finalAction = function (req, res) {
                    var controllerObj = new controller();
                    controllerObj.init(req._requestContext);
                    controllerObj[action](req, res);
                };

                if (method == 'GET') {
                    this.express.get(route.path, handlers, finalAction);
                } else if (method == 'POST') {
                    this.express.post(route.path, handlers, finalAction);
                } else if (method == 'PUT') {
                    this.express.put(route.path, handlers, finalAction);
                } else if (method == 'DELETE') {
                    this.express.delete(route.path, handlers, finalAction);
                }
            });

            // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
            this.express.use(function (err, req, res, next) {
                // If the error object doesn't exists
                if (!err)
                    return next();

                // Log it
                Log.error(err.stack);

                // Error page
                res.status(500).render('error', {
                    message: err.message,
                    error: err.stack,
                    title: 'error'
                });
            });

            // Assume 404 since no middleware responded
            this.express.use(function (req, res) {
                res.status(404);
                res.render('error', {
                    message: 'Page not found',
                    error: {},
                    title: 'error'
                });
            });
        }


        private getRequestHandlersForFilterType(filterType:typeof ActionFilter):RequestHandler {
            var self = this;
            var requestHandler = function (req:Request, res:Response, next:any) {
                var ctx = {
                    req: req,
                    res: res,
                    next: next
                };
                // create object of filter type and call before function
                var filterObj = new filterType();
                var treq:any = req; // just fooling the editor,
                filterObj.init(treq._requestContext);
                filterObj.before(ctx);

                var onFinished:any = require('on-finished');
                onFinished(res, function (err) {
                    var ctx = {
                        req: req,
                        res: res,
                        next: null
                    };
                    filterObj.after(ctx);
                });
            };
            return requestHandler;
        }

        private getRequestHandlersForFilterTypes(filterTypes:Array<typeof ActionFilter>):RequestHandler[] {
            var requestHandlers:RequestHandler[] = [];
            filterTypes.forEach((filterType) => {
                var reqHand = this.getRequestHandlersForFilterType(filterType);
                requestHandlers.push(reqHand);
            });
            return requestHandlers;
        }

    }

    export interface RequestHandler {
        (req:Request, res:Response, next:Function): any;
    }
}
