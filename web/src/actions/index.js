/*
* create by Falcon
* date: 06/05/2019
*/
import query from './query'
import messages from '../utils/message';

const action = ( name, params ) => {

    if ( !query.hasOwnProperty(name) ) return messages.queryNotFound( name )
    return query[ name ]( params )
}
export default action