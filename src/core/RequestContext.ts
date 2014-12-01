/// <reference path="../OX" />

module OX {


    export class RequestContext {

        private context:AppContext;
        private modelCacheMgr:ModelCacheManager;

        public constructor(context:AppContext){
            this.context = context;
            this.modelCacheMgr = new OX.ModelCacheManager(this);
        }

        public getAppContext():AppContext {
            return this.context;
        }

        public getModelCacheMgr():ModelCacheManager {
            return this.modelCacheMgr;
        }

    }
}
