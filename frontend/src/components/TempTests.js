import React, { Component } from 'react';

class TempTests extends Component {

	submitAdd = (e) => {
		e.preventDefault();

		const groupId = e.target.parent_id.value;
		const name = e.target.name.value;

		$.ajax('/req/basic/reactadd1111',{
			type: "POST",	
			data: "Basic[name]=" + name + "&Basic[parent_id]=" + groupId,
			// contentType: "application/json; charset=utf-8",
			dataType: "html",
			success: (data) => {
				const receivedData = JSON.parse(JSON.parse(data).content);
				$('#react-add-output').html(JSON.stringify(receivedData,null,2));
				
			},
			error: (error) => {
				const output = {
					"hello":"world",
					"and":"another",
					"another":"something"
				};
				console.log('got an error on ajax call',error.responseText)
				$('#react-add-output').html(JSON.stringify(output,null,2));
			},
		})
	}

	render() {
		return (
			<div className="tests-container">
				<h1>Tests for Basic Requirements</h1>

				<div className="test">
					<h2>ReactAdd</h2>
					<h5>/req/basic/reactadd/</h5>
					<h4>To Send:</h4>
					<h5>parent_id, name</h5>
					<h4>To Return:</h4>
					<h5></h5>
					<form onSubmit={this.submitAdd} id="react-add-form">
						<label htmlFor="">Parent ID</label>
						<input type="text" name="parent_id"/>
						<br />
						<label htmlFor="">Name</label>
						<input type="text" name="name"/>
						<br/>
						<input type="submit"/>
					</form>
					<h3>Return:</h3>
					<pre id="react-add-output"></pre>
				</div>
			</div>
		);
	}
}

export default TempTests;
