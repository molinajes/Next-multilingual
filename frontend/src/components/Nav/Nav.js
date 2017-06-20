import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";
import { Link, withRouter } from "react-router";

import NavLogo from "./NavLogo";

// import logo from '../../assets/img/logo-underlined.svg';
// import userIcon from '../../assets/rf-actor-32.svg';
import IconPositioned from "../Iconic/IconPositioned";

const prefix = "/app";

@inject("uiStore", "projectStore")
@withRouter
@observer
class Nav extends Component {
	static propTypes = {
		router: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		projectStore: PropTypes.object.isRequired
	};

	handleClick = route => {
		const { router, uiStore } = this.props;
		uiStore.setActivePage(route);
		router.push(`/app/${route}`);
	};

	handleClickModal = () => {
		const { uiStore } = this.props;
		uiStore.setBottomBarDetails("overview");
	};

	handleClickUser = () => {
		const { uiStore } = this.props;
		uiStore.setBottomBarDetails("user");
	};

	handleTutorialStart = () => {
		const { uiStore } = this.props;
		uiStore.startTutorial(0);
	};

	/*handleClickHistory = () => {
		const {uiStore} = this.props;
		uiStore.setBottomBarDetails('history', '');
	}*/

	render() {
		if (this.props.location.pathname === "/app/") return null;
		if (this.props.location.pathname === "/app/componentguide") return null;
		if (this.props.location.pathname === "/app/modelpage") return null;
		if (this.props.location.pathname === "/app/progresspage") return null;
		if (this.props.location.pathname === "/app/projectsettings") return null;
		if (this.props.location.pathname === "/app/requirementspage")
			return null;
		if (this.props.location.pathname === "/app/analysepage") return null;
		if (this.props.location.pathname === "/app/usecaseeditor") return null;
		if (this.props.location.pathname === "/app/actors") return null;
		if (this.props.location.pathname === "/app/editoutput") return null;
		if (this.props.location.pathname === "/app/releasepage") return null;
		if (this.props.location.pathname === "/app/interfaces") return null;
		if (this.props.location.pathname === "/app/businessrules") return null;
		if (this.props.location.pathname === "/app/forms") return null;
		if (this.props.location.pathname === "/app/objects") return null;
		if (this.props.location.pathname === "/app/assetpage") return null;
		if (this.props.location.pathname === "/app/devtasks") return null;

		const { uiStore, projectStore } = this.props;
		const releasePageClass = this.props.location.pathname.includes(
			"/app/output"
		)
			? " nav__fixed!"
			: ""; // FIXME: Jack: Can you change this so subnav and fixed nav work? | AjH

		const icon = projectStore.projectDetails.project_icon;

		const tabs = projectStore.projectSet
			? <div className="nav__container">

					<div className="nav__logoHomeTab">
						<div className="nav__logo">
							<Link to={prefix + "/"}>
								<NavLogo />
								{/*<img src={logo} alt="ReqFire"/>*/}
							</Link>
						</div>
						<div
							className={
								`nav__tab--home ` +
									`${uiStore.activePage === "overview" ? "nav__tab--active" : ""}`
							}
							// onClick={() => this.handleClick('overview')}
							onClick={this.handleClickModal}
						>
							{/*<Link to={prefix + "/overview"} >*/}
							{projectStore.projectDetails.project_name}
							<IconPositioned
								iconicType={icon ? icon + "-sm" : "fire-sm"}
								iconSize="32"
							/>
						</div>
					</div>

					<div
						className={
							`nav__tab ` +
								`${uiStore.activePage === "gather" ? "nav__tab--active" : ""}`
						}
						onClick={() => this.handleClick("gather")}
					>
						{/*<Link to={prefix + "/gather"} >*/}
						{/*<IconPositioned 
						iconicType="tools-sm"
						iconSize="32" />*/}
						<div className="nav__tabTitle">
							Gather {/*<br />*/}
							Requirements
						</div>
						{/*</Link>*/}
					</div>
					<div
						className={
							`nav__tab ` +
								`${uiStore.activePage === "components" ? "nav__tab--active" : ""}`
						}
						onClick={() => this.handleClick("components")}
					>
						<div className="nav__tabTitle">
							Add {/*<br />*/}
							Components
						</div>
					</div>
					<div
						className={
							`nav__tab ` +
								`${uiStore.activePage === "model" ? "nav__tab--active" : ""}`
						}
						onClick={() => this.handleClick("model")}
					>
						<div className="nav__tabTitle">
							Model {/*<br />*/}
							Activity
						</div>
					</div>
					<div
						className={
							`nav__tab ` +
								`${uiStore.activePage === "output" ? "nav__tab--active" : ""}`
						}
						onClick={() => this.handleClick("output")}
					>
						<div className="nav__tabTitle">
							Release {/*<br />*/}
							Project
						</div>
						{/*</Link>*/}
					</div>

					<div
						className={`nav__tab`}
						style={{
							marginLeft: "auto",
							height: "1.5rem",
							marginTop: "0.5rem"
						}}
						onClick={this.handleClickUser}
					>
						<IconPositioned
							iconicType="person-genderless-sm"
							iconSize="32"
						/>

					</div>
				</div>
			: <div className="nav__container">
					<div className="nav__logoHomeTab">
						<div className="nav__logo">
							<Link to={prefix + "/"}>
								<NavLogo />
							</Link>
						</div>
					</div>
					<div
						className={`nav__tab`}
						style={{
							marginLeft: "auto",
							height: "1.5rem",
							marginTop: "0.5rem"
						}}
						onClick={this.handleClickUser}
					>
						<IconPositioned
							iconicType="person-genderless-sm"
							iconSize="32"
						/>

					</div>
				</div>;

		return (
			<nav className={"nav__wrapper" + releasePageClass}>
				{tabs}
			</nav>
		);
	}
}

export default Nav;
