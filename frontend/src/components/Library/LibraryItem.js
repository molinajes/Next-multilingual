import React, { Component, PropTypes } from 'react';
import {withRouter} from 'react-router';
import {observer, inject} from 'mobx-react';
import IconPositioned from '../Iconic/IconPositioned';


@inject('uiStore')
@withRouter
@observer
class LibraryItem extends Component {
		static propTypes = {
			data: PropTypes.object.isRequired,
			router: PropTypes.object.isRequired,
			uiStore: PropTypes.object.isRequired,
			icon: PropTypes.string.isRequired,
			tileType: PropTypes.string,
			color: PropTypes.string
		}

		constructor(props) {
			super(props);
			this.state = {
				hovered: false
			}
		}

		handleClick = () => {
			const {data} = this.props;
			this.props.router.push('/app/create/' + data.id);
		}
		
		showTileDetail = () => {
			this.setState({hovered: true});
		}

		showTileOverview = () => {
			this.setState({hovered: false});
		}  

		render() {
			const { data, icon } = this.props;

			const toggleDisplay = {display: 'none'};

			return (
				<div className="indexTile">
					<div 
						className="indexTile__container" 
						onClick={this.handleClick}
						onMouseOver={this.showTileDetail}
						onMouseLeave={this.showTileOverview}>
						<div className="indexTile__icon">
							<IconPositioned 
								iconSize='56'
								iconicType={icon}
								iconColor='primary' />
						</div>
						</div>

						<div className="indexTile__title">
							{data.name}
							<div style={{height: '1.5rem'}}>	
								<div className="indexTile__tags" style={!this.state.hovered ? toggleDisplay : null}>
									<div className="indexTile__tag">
										<IconPositioned
											iconSize='24'
											iconicType='puzzle-piece-sm'
											iconColor='primary' />
									</div> 
									<div className="indexTile__tag">
										<IconPositioned
											iconSize='24'
											iconicType='laptop-sm'
											iconColor='primary' />
									</div> 
									<div className="indexTile__tag">
										<IconPositioned
											iconSize='24'
											iconicType='cart-sm'
											iconColor='primary' />
									</div> 
									<div className="indexTile__tag">
										<IconPositioned
											iconSize='24'
											iconicType='iphone-sm'
											iconColor='primary' />
									</div> 
									<div className="indexTile__tag">
										<IconPositioned
											iconSize='24'
											iconicType='people-sm'
											iconColor='primary' />
									</div> 
								</div>
							</div>
						</div>
				</div>
			);
		}
	}

export default LibraryItem;
