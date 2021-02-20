export default {
	queryNotFound: ( name ) => {
		return new Promise( ( resolve, reject ) => {
			return reject("[method not found]: " + name );
		})
	}
}