import {combineReducers} from "redux";
import  React from 'react';

let lableObj = {
    name:'',
    types:0
}
//添加标签
function addLable (state=lableObj,action){
    switch (action.type) {
        case "addLable":
            return{name:action.name,types:action.types}
        default:
            return state;
    }
}
export const reducers = combineReducers({
    addLable:addLable
})