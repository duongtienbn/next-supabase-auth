import { en } from "@/public/en"; 
import { jp } from "@/public/jp"; 
export const dictionary:{[key:string]:any}={
   en,
   jp
}
export const translate= (key:string, locale:"en"|"jp"="en")=>{
   const json =dictionary[locale]
   const keys = key.split('.');
   const value = keys.reduce((acc:any, currentKey) => {
     if (acc && typeof acc === 'object') {
       return acc[currentKey];
     }
     return undefined;
   }, json);
   return value !== undefined ? value : key;
 };
 