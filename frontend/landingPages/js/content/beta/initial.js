var prefix = '/pages/landing/beta/assets/';
var iconPrefix = '/app/assets/icons/svg/';

var content = {
    header: {
        logoSrc: prefix + "logo-underlined.svg",
        footerLogoSrc: prefix + "logo_footer_light.svg",
        title: "Sign Up & Features"
    },
    main: {
        title: "Tea",
        backgroundSrc: prefix + "logo.png",
        subTitle: "<em>What tool do you use for requirements and modelling your app?</em> <br><strong> Reqfire improves the communication between tech and non-tech so you can build better websites and apps.</strong>"
    },
    headline: {

        title: "Define&nbsp;clearer&nbsp;specs&mdash;build&nbsp;better&nbsp;tech",
        title2: "Bridge the gap between tech and non-tech",
        subtitle: "Teams use reqfire to <span class='underline--yellow'>gather requirements & generate models</span>, communicate&nbsp;to&nbsp;<span class='underline--orange'>developers&nbsp;&&nbsp;clients</span>,<br /> and build <span class='underline--mango'>better apps & websites</span>.",

        team: "Teams use reqfire",
        todo: "to communicate the tech they need,",
        whoContent: "with the requirements & models",
        who: "developers prefer,",
        to: "to create",
        what: "better websites & apps."
    },
    signUp: {
        title: "Early access is now available",
        altTitle: "Ready to turn your requirements into an app? Join the waiting list now",
        buttonPlaceholder: "Enter an email address",
        buttonPlaceholder2: "Sign up for better requirements",
        buttonText: "Sign up now",
        buttonText2: "Join the beta",
        titleOld: "Invites for the <span class='text--sb'>free-beta</span> released in March!",
        altTitleOld: "Ready to turn your <span class='text--sb'>requirements into an app?</span>",
    },
    benefits: [
        {
            title: "Test and build ideas faster",
            firstHeading: "Built for rapid requirements analysis",
            firstIcon: iconPrefix + "dashboard-md.svg",
            secondHeading: "Prototype faster with Use&nbsp;Cases",
            secondIcon: iconPrefix + "fire-md.svg",
            thirdHeading: "Automatically generate specification documents",
            thirdIcon: iconPrefix + "document-md.svg",
        },
        {
            title: "Create better websites and apps",
            firstHeading: "Bring process to your project with the Use&nbsp;Case Methodology",
            firstIcon: iconPrefix + "cogs-md.svg",
            secondHeading: "Unambiguous specifications lets you develop without doubts",
            secondIcon: iconPrefix + "eye-open-md.svg",
            thirdHeading: "Visualise your project to better prioritise or drop features",
            thirdIcon: iconPrefix + "project-md.svg",
        },
        {
            title: "Communicate using a common language",
            firstHeading: "Communicate with a language that business can understand",
            firstIcon: iconPrefix + "briefcase-md.svg",
            secondHeading: "Bridge the gap between tech and non-tech teams",
            secondIcon: iconPrefix + "people-md.svg",
            thirdHeading: "Get approval & showcase your work in a client-ready format",
            thirdIcon: iconPrefix + "easel-md.svg",
        }
    ],
    detail: {
        teamTitle: `
            Made for all teams
            `,
        team: `
        <div>
        <h4>No tech skills? No problem! </h4>
        <ul> 
             <li>
                Uses a non-technical language that everybody can understand. 
             </li>
        </ul>
        </div>
        <div>
        <h4>Built for business</h4>
        <ul> 
             <li>
                Focus on your requirements, not the technical implementation.
             </li>
        </ul>
        </div>
        <div>
        <h4>Agencies, studios and dev shops</h4>
        <ul> 
             <li>
                Present your requirements and use cases in a way your clients can understand. 
             </li>
        </ul>
        </div>
    `,
    whoTitle: `
            Better specs&nbsp;=&nbsp;better tech
            `,
         who: `
        <div>
        <h4>Develop with certainty</h4>
        <ul> 
             <li>
                Solid use case analysis and documentation lets developers focus on building the building the app.
             </li>
        </ul>
        </div>
        <div>
        <h4>Generate requirement models</h4>
        <ul> 
            <li>Complete requirements models</li>
            <li>Software requirement specifications</li>
            <li>Use Case Diagrams (UML)</li>
            <li>Traceability and Feature Approvals</li>
        </ul>
        </div>

    `,
        whyTitle: `
            Bring process to projects
            `,
         why: `
        <div><h4>Define first, code after</h4>
        <ul> 
             <li>
                Prototype your ideas with use cases, a faster way than wireframing or code.
             </li>
        </ul>
        </div>
        <div>
        <h4>Get buy-in when it counts</h4>
        <ul> 
            <li>
                For happy clients and better products, get early approval of requirements that your client or team understands.
            </li>
        </ul>
        </div>
    `
    },
    callOut: {
        title: "How to model apps in 5 steps",
        subtitle: "Reqfire is easy-to-use and fast. In this example we will model a chat-bot in five steps. <br />See how you could save time and produce better sites and apps.",
        firstIcon: iconPrefix + "person-genderless-md.svg",
        secondIcon: iconPrefix + "chat-md.svg",
        thirdIcon: iconPrefix + "terminal-md.svg"
    },
    steps: [
        {
            title: "Start with a template",
            subPoint1: "Get a headstart on your project. Use our templates to add common use cases, interfaces and forms for social apps.",
            features: ["Template library for common apps", "Save time with reusable documentation", "Boilerplate models make it easier to start"],
            subPoint2: "Now you're ready to customise your model.",
            imgPath: prefix + "MKT_WEB_index.webm",
            imgAlt: "Start with a template"
        },
        {
            title: "Get your requirements",
            subPoint1: "Collect requirements straight into the app and then link them to the other parts of your model.",
            features: ["Requirements management", "Prioritise requirements and features", "Client and team approval", "Trace requirements to components <br>(e.g. “Home page is mobile-first” links to “Home-page Mobile” interface)", "External form for approval (coming soon)"],
            subPoint2: "With your project approved it’s time to add in what your app requires.",
            imgPath: prefix + "MKT_WEB_gather.webm",
            imgAlt: "Get your requirements"
        },
        {
            title: "Design the look and feel",
            subPoint1: "Upload your app interfaces, detail forms, define business rules and include objects.",
            features: ["Linked components", "Interface upload ", "Form editor ", "Business Rules  ", "Objects (e.g. User records, credit cards, wifi routers) ", "Library items for all components (coming soon)"],
            subPoint2: "With the app model taking shape you’re ready to connect it all together.",
            imgPath: prefix + "MKT_WEB_components.webm",
            imgAlt: "Design the look and feel"
        },
        {
            title: "Define your app's behaviour",
            subPoint1: "The use case editor connects your app in every way. Link to requirements, add users and actors, their activity and what they use.",
            features: ["Generates Use Case diagrams","Use case editor","Add user flows (including alternate flows)","Activity steps","Link requirements to use cases ","Use case impact to project (coming soon)"],
            subPoint2: "With the app defined it’s time to share your work.",
            imgPath: prefix + "MKT_WEB_model.webm",
            imgAlt: "Define your app's behaviour"
        },
        {
            title: "Share your model & get it built",
            subPoint1: "Generate your model automatically then show off your work to the client and give your development team a spec to build off.",
            features: ["Generate complete requirements models","Release history","Version history","External View via shareable link"], 
            subPoint2: "In five steps you’ve completed a requirements model for your app.",
            imgPath: prefix + "MKT_WEB_release.webm",
            imgAlt: "Share your model & get it built"
        },
    ],
    testimonial: {
        1: {
            quote: "By modelling our latest product in reqfire we were able to make some realisations that normally we would only find after starting coding.",
            quoteHighlight: "reqfire saved us from making a false start. - DPos",
            imgSrc: prefix + "testimonial__dpos.png",
            imgAlt: "testimonial 1 imgAlt"
        },
        2: {
            quoteHighlight: "reqfire is a key part of our outsourced technology development. - Wine Genius",
            quote: "We can visualise and review the application in advance, and test the developed systems match the design.",
            imgSrc: prefix + "testimonial__winegenius.png",
            imgAlt: "testimonial 2 imgAlt"
        }
    },
    bannerCta: {
        title: "For a limited time we are offering free trials!",
        buttonText: "Sign up to the waiting list now"
    },
    footer: {
        signUpLink: "#waitingList",
        termsLink: "aaa",
        contactLink: "aaa"
    },
    listId: 'f2a0e8e4c0', 
    pageName: 'webDev'
};

var exports = module.exports;
exports.content = content;