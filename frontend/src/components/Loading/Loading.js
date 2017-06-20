import React, { Component } from 'react';

class Loading extends Component {
	static propTypes = {
		
	}

	render() {
		return (
			<div className='loadingPage'>
				<div className="ctnr">
					<div className="ldr">
						<div className="ldr-blk"></div>
						<div className="ldr-blk an_delay"></div>
						<div className="ldr-blk an_delay"></div>
						<div className="ldr-blk"></div>
					</div>
				</div>
			</div>
		);
	}
}

export default Loading;
