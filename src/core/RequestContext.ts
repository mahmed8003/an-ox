/// <reference path="../OX" />

module OX {


    export class RequestContext {

        public userData:any;
        private context:AppContext;
        private modelsIns:Model[];
        private _:any = require('underscore');


        public constructor(context:AppContext){
            this.context = context;
            this.modelsIns = [];
        }

        public getAppContext():AppContext {
            return this.context;
        }

        public getModel(model:typeof Model):Model {

            var modelIns:Model = this._.find(this.modelsIns, function(modelIns) { return modelIns instanceof Model});
            if(modelIns != undefined) {
                return modelIns;
            }

            var mClass = this.context.getModel(model);
            if(mClass != undefined) {
                modelIns = new mClass();
                modelIns.init(this);
                this.modelsIns.push(modelIns);

            }
            return modelIns;
        }

    }
}
