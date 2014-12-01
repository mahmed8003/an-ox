/// <reference path="../OX" />

module OX {

    export class CFilterInfo {
        public filterType:typeof ActionFilter;
        public actions:string[];
        private _:any = require('underscore');

        public constructor() {
            this.actions = [];
        }

        public addActions(...actions:string[]):CFilterInfo {
            this.actions.push.apply(this.actions, actions);
            return this;
        }

        public addAction(action:string):CFilterInfo {
            this.actions.push(action);
            return this;
        }

        public contains(action:string):boolean {
            return this._.contains(this.actions, action);
        }

    }

    export class Controller {
        static filtersInfo:CFilterInfo[] = [];
        static isConfigured:boolean = false;
        private context:RequestContext;
        private modelCacheMgr:ModelCacheManager;

        public static configure() {
        }

        public static addFilter(filterType:typeof ActionFilter):CFilterInfo {
            var filterInfo:CFilterInfo = new CFilterInfo();
            filterInfo.filterType = filterType;
            this.filtersInfo.push(filterInfo);
            return filterInfo;
        }

        public init(context:RequestContext) {
            this.context = context;
        }

        public getModel(model:typeof Model):Model {
            return this.context.getModelCacheMgr().getModel(model);
        }
    }
}
