export default (request) => {

	let dataString = '';

	Object.keys(request).forEach((key, index, arr) => {
		dataString += `Component[${key}]=${request[key]}`
		if (index !== (arr.length-1)) {
			dataString += '&'
		}
	})

	$.ajax('/app/component/reactadd',{
		type: "POST",	
		data: dataString,
		// contentType: "application/json; charset=utf-8",
		dataType: "html",
		success: (data) => {
			console.log('Got Data',data)
			// const status = JSON.parse(data).status
			// const message = JSON.parse(data).message
			// const receivedData = JSON.parse(JSON.parse(data).content);
			const receivedData = JSON.parse(data).content;
			console.log(receivedData);	
			window.data = receivedData;
		},
		error: (error) => {
			console.error(error)
		},
	})
}