/// <reference path="../OX" />

module OX {

    export interface AFContext {
        req: Request;
        res: Response;
        next: () => void;
    }

    export class ActionFilter {
        private context:RequestContext;

        public init(context:RequestContext) {
            this.context = context;
        }

        public getModel(model:typeof Model):Model {
            return this.context.getModelCacheMgr().getModel(model);
        }

        before(context:AFContext): void {
            context.next();
        }
        after(context:AFContext): void {

        }
    }

}
