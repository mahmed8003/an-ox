/// <reference path="../OX" />

module OX {

    export class CFilterInfo {
        public filterType:typeof ActionFilter;
        public actions:string[];

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
            this.actions.forEach((act) => {
                if(action == act) {
                    return true;
                }
            });
            return false;
        }

    }

    export class Controller {
        static filtersInfo:CFilterInfo[] = [];
        static isConfigured:boolean = false;
        private context:AppContext;
        private modelCacheMgr:ModelCacheManager;

        public static configure() {
        }

        public static addFilter(filterType:typeof ActionFilter):CFilterInfo {
            var filterInfo:CFilterInfo = new CFilterInfo();
            filterInfo.filterType = filterType;
            this.filtersInfo.push(filterInfo);
            return filterInfo;
        }

        public init(context:AppContext, modelCacheMgr:ModelCacheManager) {
            this.context = context;
            this.modelCacheMgr = modelCacheMgr;
        }

        public getModel(model:typeof Model):Model {
            return this.modelCacheMgr.getModel(model);
        }
    }
}
