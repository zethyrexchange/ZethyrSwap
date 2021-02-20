export function delay(time) {
   return new Promise((resovel, reject) => {
		setTimeout(() => {
            return resovel(); 	      
        }, time);
	});
}