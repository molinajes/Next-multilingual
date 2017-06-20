export default [
	{
		id: "project",
		name: "Project",
		step: "0",
		stepGroup: "Set Up",
		subTabs: [
			{
				id: "progresspage",
				name: "Progress",
				iconName: "np_trophy",
				pageHeadingIcon: "np_trophy",
				pageHeadingDescription: "Two sentences that showcase how easy and great it is to have this page. How do we insert breaks?",
			},
			{
				id: "projectsettings",
				name: "Settings",
				iconName: "np_set_up",
				pageHeadingIcon: "np_community",
				pageHeadingDescription: "Set up your project and invite your team to collaborate.  Get a snapshot of activity and progress.",
			},
		]
	},
	{
		id: "requirements",
		name: "Requirements",
		step: "1",
		stepGroup: "Document Requirements",
		subTabs: [
			{
				id: "requirementspage",
				name: "Gather",
				iconName: "np_comments",
				pageHeadingIcon: "np_discussion",
				pageHeadingDescription: "Record all the information you know about the project.  Get your ideas down rapidly and then sort them into a meaningful hierarchy.",
			},
			{
				id: "analysepage",
				name: "Analyse",
				iconName: "np_microscope",
				pageHeadingIcon: "np_network",
				pageHeadingDescription: "Create the assets you think will play a part in meeting each requirements. It’s OK to make too many, you can always delete them later.",
			},
		]
	},
	{
		id: "modelActivity",
		name: "Model Activity",
		step: "2",
		stepGroup: "Model Interactivity",
		subTabs: [
			{
				id: "actors",
				name: "Actors",
				iconName: "np_actor",
				pageHeadingIcon: "np_orgChart",
				pageHeadingDescription: "Identify all the people and other systems who are going to ‘act’ on the system being modelled.",
			},
			{
				id: "usecaseeditor",
				name: "Use Cases",
				iconName: "np_useCaseScreen",
				pageHeadingIcon: "np_strategy",
				pageHeadingDescription: "Describe the interactions between Actors and the system to achieve a specific goal.  Each goal is achieved through a series of steps.",
			},
		]
	},
	{
		id: "releaseproject",
		name: "Release Project",
		step: "3",
		stepGroup: "Ready for Release",
		subTabs: [
			{
				id: "editoutput",
				name: "Edit Output",
				iconName: "np_editReport",
				pageHeadingIcon: "np_completeReport",
				pageHeadingDescription: "Create and introduction and background to the project to set the scene for the audience of your model.",
			},
			{
				id: "releasepage",
				name: "Release",
				iconName: "np_createRelease",
				pageHeadingIcon: "np_versionHistory",
				pageHeadingDescription: "Create a snapshot of your project’s current state.  Publish this release of your model to allow it to be reviewed by others.",
			},
		]
	},
	{
		id: "assets",
		name: "Assets",
		step: "",
		stepGroup: null,
		subTabs: [
			{
				id: "interfaces",
				name: "Interfaces",
				iconName: "np_interface",
				pageHeadingIcon: "np_interface",
				pageHeadingDescription: "Interfaces are an easy entry point for modelling your application.  Add any wireframes you have created during your UX design phase.  Connecting them into the model will explain their context.",
			},
			{
				id: "businessrules",
				name: "Rules",
				iconName: "np_businessRule",
				pageHeadingIcon: "np_businessRule",
				pageHeadingDescription: "Business Rules capture logic that is applied in Use Case steps. Rules may be quite simple, or quite complex.  Rules do not document a flow of events from the Actor’s point of view.",
			},
			{
				id: "forms",
				name: "Forms",
				iconName: "np_form",
				pageHeadingIcon: "np_form",
				pageHeadingDescription: "Forms represent input interfaces for either people or other systems to use.  Define the information to be collected as the form properties, add validation rules and other details about the display of the form.",
			},
			{
				id: "objects",
				name: "Objects",
				iconName: "np_object",
				pageHeadingIcon: "np_object",
				pageHeadingDescription: "Objects are ‘things’ that your system models, they should be real-world rather than purely technical concepts. People, transactions, products, tickets and payments are all types of Objects.",
			},
		]
	},
];