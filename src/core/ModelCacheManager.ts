/// <reference path="../OX" />

module OX {

    export class ModelCacheManager {
        private modelsIns:Model[];
        private context:RequestContext;
        private _:any = require('underscore');

        constructor(context:RequestContext){
            this.context = context;
            this.modelsIns = [];
        }


        public getModel(model:typeof Model):Model {

            var modelIns:Model = this._.find(this.modelsIns, function(modelIns) { return modelIns instanceof Model});
            if(modelIns != undefined) {
                return modelIns;
            }

            var mClass = this.context.getAppContext().getModel(model);
            if(mClass != undefined) {
                modelIns = new mClass();
                modelIns.init(this.context);
                this.modelsIns.push(modelIns);

            }
            return modelIns;
        }


    }
}
