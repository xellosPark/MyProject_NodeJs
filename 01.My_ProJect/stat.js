const pi = 3.14;
const mean = (arr) => {
    if(arr.length === 0){
        return 0;
    }
    let sum = 0;
    for( let i = 0; i<arr.length; i++){
        sum += arr[i];
    }
    return sum / arr.length;
};

// module.exports = {
//     // pi:pi,
//     // mean:mean
//     pi,
//     mean
// }

expots.pi = pi;
expots.mean = mean;