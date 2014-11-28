/// <reference path="../OX" />

module OX {

    export interface AFContext {
        request: Request;
        response: Response;
        next: () => void;
    }

    export class ActionFilter {
        private context:AppContext;
        private modelCacheMgr:ModelCacheManager;

        public init(context:AppContext, modelCacheMgr:ModelCacheManager) {
            this.context = context;
            this.modelCacheMgr = modelCacheMgr;
        }

        public getModel(model:typeof Model):Model {
            return this.modelCacheMgr.getModel(model);
        }

        before(context:AFContext): void {
            context.next();
        }
        after(context:AFContext): void {

        }
    }

}
