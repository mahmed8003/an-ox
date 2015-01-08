/// <reference path="../../app.ts" />

module Sparky {

    export class UserModel extends OX.Model {

        private loggedIn:boolean = false;
        private count:number;

        public constructor(){
            super();
            this.count = 25;
        }

        public static configure() {

        }

        public getUser(){

            var user:any = {
                name: 'I am Sparky',
                age: 1200,
                location: 'Plato'
            };

            if (this.isLoggedIn()) {
                user.login_status = 'LoggedIn';
            }

            return user;
        }

        public doLogin() {
            this.count += 30;
            this.loggedIn = true;
        }

        public isLoggedIn() {
            return this.loggedIn;
        }
    }
}
