import axios from 'axios';
import querystring from 'querystring';

export default function makeRequest (method, url, params = {}, header = null, timeout = 3000) {
    return new Promise((resolve, reject) => {
        method = method.toLowerCase();
        let opts = { 
            "method": method, 
            "url": url
        }
        if ( header ) {
            opts.headers= header; 
        }   
        if ( method == 'get' ) {
            opts.params = params; 
        } else {
            opts.data = params; 
        }  
        if ( header && opts.data && header['Content-Type'] == 'application/x-www-form-urlencoded' ) {
            opts.data = querystring.stringify( opts.data ); 
        }
        
        axios(  opts )
            .then( response => { return resolve( response.data ); })
            .catch( err => { 
                let message = err.message ? err.message : 'Something went wrong!';
                return reject(message); 
            });
    });
}