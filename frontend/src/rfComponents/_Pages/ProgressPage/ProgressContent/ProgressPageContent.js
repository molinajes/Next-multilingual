import {observable} from 'mobx';

export default observable({
	projectsettings: {
		name: "Project Settings",
		// pageHeadingDescription: "Set up your project and invite your team to collaborate.  Get a snapshot of activity and progress.",
		goal: "Add a description and choose an icon for your project",
		bonus: "Invite a team member (and get a free month)",
		steps: [
			"Go to Project Settings",
			"Fill in a description to communicate what your project is about",
			"Invite a team member to collaborate on the project",
		],
		bestExamples: "A meaningful icon and good project description will help you sort out which project is which when become a requirements ninja and have lots of Reqfire projects."
	},

	requirementspage: {
		name: "Gather",
		// pageHeadingDescription: "Record all the information you know about the project.  Get your ideas down rapidly and then sort them into a meaningful hierarchy.",
		goal: "Add ten requirements",
		bonus: "Add three groups of requirements",
		steps: [
			"Abstract any written notes into single requirements.",
			"Organise them logically into groups and move any refining details under the requirement it supports.",
			"Add in missing or implied requirements.",
			"Review with the business to get agreement on the scope of the project.",
		],
		bestExamples: `There are no wrong requirements.  Extract all the points from written material the business has provided to describe the new system. Add in any logical results or consequences that are implied.  Keep your requirements simple, use the ‘detail’ level to refine them.
Here is an example:
Group
Requirement
Detail
Detail
Detail
Requirement`
	},

	analysepage: {
		name: "Analyse",
		// pageHeadingDescription: "Create the assets you think will play a part in meeting each requirements. It’s OK to make too many, you can always delete them later.",
		goal: "Create and link assets to 60% of your requirements.",
		bonus: "Link each asset to at least one requirement",
		steps: [
		"Consider each requirement and decide if an asset will be used in meeting it. E.g. A Form may be required if information is being input, and Interface will be required if information is being displayed",
		"Select the asset type from the menu and add a new asset by typing its name.",
		"If the asset exists, select if from the list, or search for it by typing a few letters of its name.",
		],
		bestExamples: `An example requirement is “Members can update their avatar from the profile page.”
This requirement could be linked to these assets:
Interface - ‘Profile Page’
Form - ‘Select Avatar’
Object - ‘Member Account’
Rule - ‘Members have a default avatar’
`
	},

	actors: {
		name: "Actors",
		// pageHeadingDescription: "Identify all the people and other systems who are going to ‘act’ on the system being modelled.  ",
		goal: "Create an actor ",
		bonus: "Create a hierarchy ",
		steps: [
		"Update the default Actor’s name and description to be your first actor",
		"Add a second Actor and make them ‘inherit’ from the first actor. Inheritance means this actor can do everything the other actor can do, and some more.",
		],
		bestExamples: `A typical actor hierarchy that is common in web applications is:

Public - a public web user
Member - a user who has created an account and is logged in.
Administrator - a user who can configure the system and view user accounts.`
	},

	usecaseeditor: {
		name: "Use Case Editor",
		// pageHeadingDescription: "Describe the interactions between Actors and the system to achieve a specific goal.  Each goal is achieved through a series of steps. ",
		goal: "Create four Use Cases with at least one step",
		bonus: "Link an Asset to a step to each Use Case",
		steps: [
		"Give your Use Case a name.  Use a short name with a strong verb, e.g. “Create Project",
		"Open the step editor for that Use Case.",
		"Add your first step in the format “Actor does (some action)” and “System does (something) and displays (some Interface)”.",
		"Link that step to the Interface you mentioned in the step description by using the Asset menu.",
		],
		bestExamples: `Use Cases should have at least 3 steps, if they have less than this you need to consider if they are actually a Use Case, or just part of a Use Case.  The ideal pattern in Reqfire is to show an Actor action followed by a system result that involves displaying a new or updated interface. This example shows a registration process for a membership:

Subscribe to Newsletter
Description
This Use Case describes the process of a Public web user subscribing to the newsletter email list.
Preconditions
None
Actors
Public
Main Activity Flow
step 1: Actor selects ‘Sign-Up for Newsletter’ in footer menu.
System displays a pop-up with the ‘Subscribe Form’
Assets: Interface: Pop-up Window, Form: Subscribe Form.
step 2: Actor completes ‘Subscribe Form’ and submits.
System validates the result, adds the current user to the subscriber list, and displays a success message.
Assets: Rule: Valid email address, Rule: Single subscription per email address.
step 3: Actor clicks the acknowledgement button.
	System closes the pop-up.
Alternative Flow A
step 2A: Actor completes ‘Subscribe Form’ and submits.
System fails validation of input and redisplays form with errors highlighted.
Rejoin at step 2
`
	},

	editoutput: {
		name: "Edit Output",
		// pageHeadingDescription: "Create and introduction and background to the project to set the scene for the audience of your model.",
		goal: "Add an introduction to your model output",
		bonus: "Add a second section, e.g. a glossary or non-functional requirements.",
		steps: [
			"Click the edit link in the Introduction preview.",
			"Edit the content to reflect the details of your project.",
		],
		bestExamples: `Here is a sample introduction for a small project.

Background
The ACME corporation has been supplying anvils, rockets and dynamite to the coyote community for 60 years. The company has recently decided to establish a 'just-in-time' delivery service to their customers location, which is frequently remote and arid.  The company intends to leverage mobile phone technology to allow for easier customer interaction and order tracking.
Purpose
The purpose of this document is to identify and document the business requirements applicable to the proposed Scope.  The intended audience is the ACME company management and potential system developers.
Included In Scope
The following items are included in the scope of the App:
A product catalog
A user account system
An online ordering system
A delivery location specified by map
An order delivery tracking system
Excluded From Scope
The following items are excluded from the scope of the App:
Any Roadrunner related functions such as tracking, identification or capture
Emergency help beacon or assistance calling
Assumptions
This section lists any assumptions that have been made relating to the App.
Customers will supply their own mobile connected hardware.
Existing ACME systems will be suitable for integration to the new system.
ACME warehouses will use a stock management system provided by others.
Constraints
This section lists any constraints that restrict the requirements relating to the App.
Budget for the new development is limited to $100
ACME must comply with the Explosives Transport Regulations.
All anvil sizes are not consistently available.
`
	},

	releasepage: {
		name: "Release",
		// pageHeadingDescription: "Create a snapshot of your project’s current state.  Publish this release of your model to allow it to be reviewed by others. ",
		goal: "Create your first release",
		bonus: "Not feasible currently ---Share with five reviewers (and get a free month)",
		steps: [
			"Click the Finalise icon on the Release page.",
			"Select the release from the External View dropdown to see what your reviewers will see.",
		],
		bestExamples: `It is good practice to create a release whenever your model is being reviewed by others.  This gives all the people involved in project a reference point, and changes arising from each review can result in a new release.  It is not uncommon to have more than 5 releases prior to commencing a project build.`
	},

	interfaces: {
		name: "Interfaces",
		// pageHeadingDescription: "Interfaces are an easy entry point for modelling your application.  Add any wireframes you have created during your UX design phase.  Connecting them into the model will explain their context.",
		goal: "Add the Reqfire template pack",
		bonus: "Create an Interface and add a wireframe.",
		steps: [
		"Select the ‘Add Template’ button in the Interface list",
		"View one of the added interfaces by clicking on it.",
		"Upload an image to be the wireframe for the new interface.",
		],
		bestExamples: ""
	},

	businessrules: {
		name: "Business Rules",
		// pageHeadingDescription: "Business Rules capture logic that is applied in Use Case steps.  Rules may be quite simple, or quite complex.  Rules do not document a flow of events from the Actor’s point of view.",
		goal: "Define a simple Business Rule, e.g. Password Complexity",
		bonus: "Link a Business Rule to a Use Case step.",
		steps: [
			"Click to add a rule.",
			"Type a short descriptive name so you can remember the intention of the rule.",
			"Complete the rule detail, or just add some notes so you can return to it later on.",
		],
		bestExamples: ""
	},

	forms: {
		name: "Forms",
		// pageHeadingDescription: "Forms represent input interfaces for either people or other systems to use.  Define the information to be collected as the form properties, add validation rules and other details about the display of the form.",
		goal: "Create a Form",
		bonus: "Add some properties to the form.",
		steps: [
			"Create a form",
			"Create a form property and define the type, validation, and description.",
		],
		bestExamples: ""
	},

	objects: {
		name: "Objects",
		// pageHeadingDescription: "Objects are ‘things’ that your system models, they should be real-world rather than purely technical concepts. People, transactions, products, tickets and payments are all types of Objects.",
		goal: "Create a Object",
		bonus: "Add an object property to sn object.",
		steps: [
			"Create an object and add a name and description", 
			"Add an object property and description.",
			],
		bestExamples: ""
	}
});