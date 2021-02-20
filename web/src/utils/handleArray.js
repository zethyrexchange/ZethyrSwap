export default {
	sortDex(array, pair, isAsc = true) {
        array.sort(function(a, b){
            if (isAsc == true) {
                return a['sPrice'][pair] - b['sPrice'][pair] //sort by date ascending
            } else {
                return b['sPrice'][pair] - a['sPrice'][pair] //sort by date ascending
            }
        });
        return array;
    },
    sortArray(array, key, isAsc = true, isValueString = false) {
        array.sort(function(a, b){

            if (isValueString == true) {
                var valueA = a[key].toUpperCase(); 
                var valueB = b[key].toUpperCase(); 
                if (isAsc == true) {
                    if (valueA < valueB) {
                      return -1;
                    }
                } else {
                    if (valueB < valueA) {
                      return -1;
                    }
                }
                
            } else {
                if (isAsc == true) {
                    return a[key] - b[key] //sort by date ascending
                } else {
                    return b[key] - a[key] //sort by date ascending
                }
            }
        });
        return array;
    },
    sortArrayByDecimals(array ,num) {
        var result  = [];
        array.map(object=>{
            var start = object.price.indexOf('.');
            var objectPrice  = object.price.substr(parseInt(start) + 1, object.price.length);
            if(objectPrice.length == num ){
                result.push(object);
            }
        })
        return result;
    },
    getArrayByPageLimit ( array, page, limit ) {
        var new_array = [];
        page = page ? parseInt( page ) : 1;
        limit= limit? parseInt( limit ): 20;
        for ( let i = 0; i < array.length; i++ ) {
            if ( i >= ( limit * ( page -1 ) ) && i < ( limit * page )  ) {
                new_array.push( array[ i ] );
            }
        }
        return new_array;
    }
}