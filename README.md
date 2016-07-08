# docsort
Sort JSON arrays, create sorted JSON arrays.
Very simple, lightweight library. Uses recursive document comparison to determine which "comes first" (makes use of localeCompare for strings). Uses binary search for inserts and lookups.
Documents in the array should share **at least** the structure of the sort specifier. For example, if a sort specifier is trying to sort by `name`, then the documents in the array should **at least** implement a `name` field, etc. Documents which "intersect" at the sort specifier should be sortable together, theoretically, but I have *not* tested that. For most cases, your documents will likely have the same structure anyways. 

## can sort documents based on nested fields.
```
import { sortIndex, push, pull } from "docsort";

let sortSpecifier = {
  airplaneGroup: -1 //first sort by airplaneGroup "Z" to "A".
  moreInfo: {
    age: 1 //then sort by age, increasing, for items in the same airplaneGroup.
  }
}

let someSortedArray = [
  {
    name: "Bob", 
    moreInfo: {
      score: 2.718,
      age: 31
    },
    airplaneGroup: "A"
  },
  //similar documents in this array...
]

let rob = {
  name: "Rob",
  moreInfo: {
    score: 3.1415926,
    age: 3
  },
  airplaneGroup: "B"
}
//this is the index that rob should be at in the array.
let indexOfRobInTheArray = sortIndex(someArray,rob,sortSpecifier)
//insert rob into the array
push(someArray, rob, sortSpecifier);
//pull rob from the array
pull(someArray, rob, sortSpecifier);
```

## `push` can be used to construct sorted arrays from unsorted arrays.
```
import { push } from "docsort";

let sortedList = [];
someUnsortedList.forEach(function(document){
  push(sortedList, document, someDesiredSortSpecifier);
})

//quickly update the sorted list when you get new data
someUnsortedList.on('data', function(newDocument){
  push(sortedList, newDocument, someDesiredSortSpecifier);
})
```