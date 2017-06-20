import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import { Link } from 'react-router';
import PageNav from './PageNav';
import logo from '../../assets/img/Logo_type_32x32.png';

const prefix = "/app";


@inject('uiStore')
@observer
class Nav extends Component {

	static propTypes = {
		uiStore: PropTypes.object.isRequired
	}
	
	render() {
		// const {uiStore} = this.props;
		return (
			<div>
				<nav className="nav__wrapper">
					<div className="nav__container">
						<div className="nav__logo">
							<Link to={prefix + "/"} >
								<img src={logo} alt="ReqFire"/>
							</Link>
						</div>
											
					</div>
				</nav>
				<PageNav />
			</div>
		);
	}
}

export default Nav;
