import React, { Component } from 'react';
import {observer} from 'mobx-react';
// import axios from 'axios';

// @inject('')
@observer
class History extends Component {
	/*static propTypes = {
		: PropTypes.object.isRequired
	}*/

	componentDidMount() {
		// this.container.src = '/app/component/history';
		/*axios.get('/app/component/history')
		.then(response => {
			
			this.container.innerHTML = response.data;
		})*/
	}

	render() {
		return (
			<iframe className="history__container" src="/app/component/history" ref={ref => this.container = ref} style={{width: '100%', height: '300vh'}}>

			</iframe>
		);
	}
}

export default History;
