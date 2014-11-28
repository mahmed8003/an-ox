/// <reference path="../OX" />

module OX {

    export interface GlobalFiltersConfig {
        config(filters:Array<typeof ActionFilter>):void;
    }

}
