import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Waypoint from 'react-waypoint';


@inject('uiStore')
@observer
class ReleaseIntroduction extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	}

	handleWaypointEnter = () => {
		const {uiStore} = this.props;
		uiStore.setOutputScrollTo('section','-1')
	}

	/*componentDidMount() {
		$.ajax('/req/project/reactmodel',{
			type: "GET",
			
			success: (data) => {
				console.log("HERE")
				var output = data.replace('</body>','').replace('</html>','')
				this.releaseOutput.innerHTML = output;
			}

		});
	}*/

	render() {
		return (
			<div className="releaseContent__container">
				<Waypoint
					onEnter={this.handleWaypointEnter}
					// onLeave={this.handleWaypointLeave}
				/>
				<div ref={ref => this.releaseOutput = ref} style={{width: "100%"}}>
					<h1 className="reqModel__title rf-h1">Social Chat Bot - Requirements Model</h1>
					<div className="releaseContent__componentGroup">	
						<h2 className="rf-h2">Release: 1.07</h2>
						<label className="rf-label">15th July 2017</label>
						
						<h3 className="rf-h3">Introduction</h3>
						<p className="rf-p">
							Welcome to the most impressive requirements model you have ever seen. What goes into it: work. What comes out of it? Apps. Is that all? No, it's for websites as well. Any questions? Probably, it's still hard to use.
						</p>
						<p className="rf-p">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus veniam eligendi doloremque laborum perferendis omnis nulla debitis eum error, quae ducimus enim sint vero reiciendis veritatis porro nobis facere similique sequi nostrum dolores asperiores fugiat, amet. Minima quae repellat, mollitia enim voluptates voluptas harum dicta consequatur eos dolore incidunt ea modi cumque corporis magni, doloremque ullam.
						</p>
						<h4 className="rf-h4">Team</h4>
						<p className="rf-p">
							A team built this. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique a repudiandae praesentium consequuntur quod nostrum officia natus vel. Ipsam, alias?
						</p>
						<h4 className="rf-h4">Timeline</h4>
						<p className="rf-p">
							Modern theories on quantum gravity say that time does not exist. My project management also seems to exhibit this theory.
							<br/>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, quidem!
						</p>
						
					</div>
				</div>
			</div>
		);
	}
}

export default ReleaseIntroduction;
