import moment from "moment";
import {appAlgorithmKey} from "../../../core/environment.tsx";

export function formatDate(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a')
}
export function encrypt(value) {
    return btoa(appAlgorithmKey+value)
}
export function decrypt(value) {
    if (value && value.length>0) {
        const code=atob(value);
        return code.split("/").pop();
    } else{
        return null
    }
}
export function  formatCurrency(value){
    //format number with commas
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}