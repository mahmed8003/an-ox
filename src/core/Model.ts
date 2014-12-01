/// <reference path="../OX" />

module OX {

    export class Model {
        context:RequestContext;

        public init(context:RequestContext) {
            this.context = context;
        }

        public static configure() {

        }
    }
}
