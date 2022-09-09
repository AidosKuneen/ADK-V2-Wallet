const arr = ['Марина', 'тяга', 'рива', 'Мир', 'хакер', 'Шельма', 'Михаил', 'слизень подгорелый', 'прыжок изподвыподверsта'];
for (let elem in arr) {
    console.log(arr)
    if ((arr[elem].length)%3 !== 0){
        arr.splice(elem,1)
    }
}
console.log(arr)