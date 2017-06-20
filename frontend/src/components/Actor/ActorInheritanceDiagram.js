import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import uuid from 'uuid';

import stick from '../../assets/stick.png';

// import cytoscape from 'cytoscape';
// import cydagre from 'cytoscape-dagre';

// cydagre( cytoscape );

@inject('actorStore')
@observer
class ActorInheritanceDiagram extends Component {

	static propTypes = {
		actorStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			image: ''
		}
	}

	componentDidMount() {
		this.drawGraph();
	}

	componentWillReceiveProps(nextProps) {
		console.log('will rec props', nextProps)
		if (nextProps.actorStore.updateActorDiagram) {
			console.log('update diagram')
		}
	}

	componentDidUpdate() {
		console.log('did update')
		// this.drawGraph();
	}



	render() {
		// const {data} = this.props;
		if (this.state.image === '') {
			return (
				<div ref={ref => this.divRef = ref} style={{width:'100%', height: '500px', border: 'solid 1px #DAE4E4', backgroundColor: 'white'}}>

				</div>
			);
		}
		else {
			return <img src={this.state.image} style={{width:'100%', height:'500px', border: 'solid 1px #DAE4E4'}}/>
		}
	}

	drawGraph = () => {
		const {actorStore} = this.props;

		let nodes = actorStore.actorData.map(actor => {
			return {
				data: {id: 'actor_' + actor.persistent_id, name: actor.name, type: 'actor', root: actor.parent_id === '-1'}
			}
		});
		

		let edges = [];
		actorStore.actorData.forEach(actor => {
			if (actor.parent_id !== '-1') {
				edges.push({
					data: { id: uuid(), target: 'actor_' + actor.persistent_id, source: 'actor_' + actor.parent_id }
				})
			}
		});
		
		this.cy = window.cytoscape({
			container: this.divRef,

			elements: {
				nodes: nodes,
				edges: edges
			},
			
			style: window.cytoscape.stylesheet()
				.selector('[type = "actor"]')
				.css({
					'content': 'data(name)',
					'text-valign': 'bottom',
					'background-image': stick,
					'background-fit': 'cover',
					'width': 40,
					'height': 90,
					'shape': 'rectangle',
				})
				.selector('edge')
				.css({
					'curve-style': 'bezier',
					// 'control-point-distance': '20px',
					// 'control-point-weight': '0.7',
					'source-arrow-shape': 'triangle',
					'source-arrow-color': '#ccc',
					// 'source-endpoint': '500px 500px',
					// 'target-endpoint': '200px 200px',
					'line-color': '#000',
					'width': 1
				}),

			zoomingEnabled: false,
		});

		var options = {
			name: 'dagre',
			// dagre algo options, uses default value on undefined
			nodeSep: 30, // the separation between adjacent nodes in the same rank
			edgeSep: 30, // the separation between adjacent edges in the same rank
			rankSep: undefined, // the separation between adjacent nodes in the same rank
			rankDir: 'TB', // 'TB' for top to bottom flow, 'LR' for left to right
			// minLen: function( edge ){ return 1; }, // number of ranks to keep between the source and target of the edge
			// edgeWeight: function( edge ){ return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges

			// general layout options
			fit: true, // whether to fit to viewport
			padding: 200, // fit padding
			animate: false, // whether to transition the node positions
			animationDuration: 500, // duration of animation in ms if enabled
			animationEasing: undefined, // easing of animation if enabled
			boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
			ready: () => {
				// this.cy.fit();
				console.log('layout ready')
			}, // on layoutready
			stop: () => {
				console.log('layout stop')
			} // on layoutstop
		};

		// this.cy.panningEnabled(false);

		// this.cy.$('[type = "actor"]').ungrabify();

		this.cy.layout( options );

		this.cy.pan({
			x: this.cy.width()/5,
			y: this.cy.height()/8
		})

		
		window.test = this.cy;
/*
		var bfs = this.cy.elements().bfs({
			roots: 'node[?root]',
			visit: function(i, depth){
				console.log( 'visit ' + this.id(), 'depth',depth );
				// return false;
				
			},
			directed: false
		});

		var path = bfs.path; // path to found node
		var found = bfs.found; // found node

		// select the path
		path.select();
		console.log(path, found)
		console.log(this.cy.elements('[type = "actor"]'))*/

		// this.cy.add(edges);

		
	/*	setTimeout(() => {
			this.setState({
				image: this.cy.png()
			})
		}, 5000);*/
	}
}

export default ActorInheritanceDiagram;
