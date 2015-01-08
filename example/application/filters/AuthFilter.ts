/// <reference path="../../app.ts" />

module Sparky {

    export class AuthFilter extends OX.ActionFilter {

        private i;

        constructor(){
            super();
            this.i = 12;
        }

        before(context:OX.AFContext): void {
            this.i += 8;

            var userModel:UserModel = <UserModel>this.getModel(UserModel);
            userModel.doLogin();
            context.next();
        }

        after(context:OX.AFContext): void {

        }

    }

}
