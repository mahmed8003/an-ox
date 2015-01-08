/// <reference path="../../app.ts" />

module Sparky {

    export class PostModel extends OX.Model {

        public constructor(){
            super();
        }

        public static configure() {

        }

        public getPost(){

            var post = {
                title: 'I am Title',
                description: 'I am a long long long description'
            };

            return post;
        }
    }
}
