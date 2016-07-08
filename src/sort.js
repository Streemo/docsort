import { type } from "typetastic";

function force(d1,d2,dir){
  if (typeof d2 === "string"){
    return dir*d2.localeCompare(d1);
  }
  let v = dir*(d2 - d1 || 0)
  return v > 0 ? 1 : v < 0 ? -1 : 0;
}
function compare(d1,d2,sort){
  if (type(sort) === "object"){
    for (let k in sort){
      let d = compare(d1[k],d2[k],sort[k]);
      if (d !== 0){return d};
    }
    return 0;
  }
  return force(d1,d2,sort);
}
export function sortIndex(arr,d2,sort){
  let min = 0, max = arr.length-1;
  let mid, dP;
  while (min <= max){
    mid = (max+min)/2 | 0;
    dP = compare(arr[mid],d2,sort);
    min = dP < 0 ? min : dP > 0 ? mid + dP : mid--;
    max = dP > 0 ? max : dP < 0 ? mid + dP : mid;
  }
  return min;
}
export function push(arr,d2,sort){
  arr.splice(sortIndex(arr,d2,sort),0,d2);
}
export function pull(arr,d2,sort){
  arr.splice(sortIndex(arr,d2,sort),1);
}