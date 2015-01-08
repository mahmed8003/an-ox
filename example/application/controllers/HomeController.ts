/// <reference path="../../app.ts" />

module Sparky {

    export class HomeController extends OX.Controller {

        public static configure() {

        }

        public constructor(){
            super();
        }

        public index(req:OX.Request, res:OX.Response){
            var userModel:UserModel = <UserModel>this.getModel(UserModel);
            var data = userModel.getUser();
            res.send(data);
        }
    }
}
