import React from 'react';
import TutorialContainer from '../components/HelpContent/Tutorials/TutorialContainer';
import WelcomeTutorial from '../components/HelpContent/Tutorials/WelcomeTutorial';
import EndTutorial from '../components/HelpContent/Tutorials/EndTutorial';
import ModuleTutorial from '../components/HelpContent/Tutorials/ModuleTutorial';
import LinkTutorial from '../components/HelpContent/Tutorials/LinkTutorial';
import NavTutorial from '../components/HelpContent/Tutorials/NavTutorial';
import Nav2Tutorial from '../components/HelpContent/Tutorials/Nav2Tutorial';

export default [
	{
		name: "Welcome",
		className: "nav__logo",
		elementNumber: 0,
		content: (
			<TutorialContainer>
				<WelcomeTutorial />
			</TutorialContainer>
		),
		location: '/app/gather'
	},
	{
		name: "Module",
		className: "moduleTitle__tile",
		elementNumber: 0,
		content: (
			<TutorialContainer>
				<ModuleTutorial />
			</TutorialContainer>
		),
		location: '/app/gather'
	},
	{
		name: "Link Components",
		className: "component__selector",
		elementNumber: 0,
		content: (
			<TutorialContainer>
				<LinkTutorial />
			</TutorialContainer>
		),
		location: '/app/gather'
	},
	{
		name: "Nav",
		className: "nav__tab",
		elementNumber: 0,
		content: (
			<TutorialContainer>
				<NavTutorial />
			</TutorialContainer>
		),
		location: '/app/gather'
	},
	{
		name: "Nav",
		className: "nav__tab",
		elementNumber: 3,
		content: (
			<TutorialContainer>
				<Nav2Tutorial />
			</TutorialContainer>
		),
		location: '/app/components'
	},
	{
		name: "Thank You",
		className: "nav__logo",
		elementNumber: 0,
		content: (
			<TutorialContainer>
				<EndTutorial />
			</TutorialContainer>
		),
		location: '/app/gather'
	},
]