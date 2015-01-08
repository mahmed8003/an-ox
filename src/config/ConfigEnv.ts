/// <reference path="../OX" />

module OX {

    export interface ConfigEnv<T> {
        development:T;
        production:T;
        test:T;
    }

}