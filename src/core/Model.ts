/// <reference path="../OX" />

module OX {

    export class Model {
        context:RequestContext;

        public init(context:RequestContext) {
            this.context = context;
        }

        public getContext():RequestContext {
            return this.context;
        }

        public getAppContext():AppContext {
            return this.context.getAppContext();
        }

        public getModel(model:typeof Model):Model {
            return this.context.getModel(model);
        }

        public static configure() {

        }
    }
}
