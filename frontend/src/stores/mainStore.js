import { observable, action, extendObservable } from "mobx";
// import {withRouter} from 'react-router';
import axios from "axios";

import updateBasicNumber from "../utils/updateBasicNumber";
import componentIdToName from "../utils/componentIdToName";
import createModelFromData from "../utils/createModelFromData";
import removeItemFromArray from "../utils/removeItemFromArray";

import importedData from "../assets/reqfireData.json";
import importedLibrary from "../assets/demoLibraries.json";

import uiStore from "./uiStore";

import projectStore from "./projectStore";
import actorStore from "./actorStore";
import flowStore from "./flowStore";
import formPropertyStore from "./formPropertyStore";
import formStore from "./formStore";
import ifaceStore from "./ifaceStore";
import ifaceTypeStore from "./ifaceTypeStore";
import imageStore from "./imageStore";
import objectPropertyStore from "./objectPropertyStore";
import objectStore from "./objectStore";
import packageStore from "./packageStore";
import requirementStore from "./requirementStore";
import ruleStore from "./ruleStore";
import stepObjectStore from "./stepObjectStore";
import stepStore from "./stepStore";
import traceStore from "./traceStore";
import useCaseStore from "./useCaseStore";
import componentStore from "./componentStore";
import categoryStore from "./categoryStore";
import libraryStore from "./libraryStore";
import userStore from "./userStore";

// @withRouter
class MainStore {
    @observable appData = {
        components: {
            rule: [],
            form: [],
            formproperty: [],
            actor: [],
            package: [],
            object: [],
            objectproperty: [],
            flow: [],
            step: [],
            usecase: [],
            photo: [],
            iface: [],
            interfacetype: [],
            stepobject: [],
            glossary: [],
            basic: [],
            trace: [],
            category: [],
            stepiface: [],
            steprule: [],
            simple: [],
            statetransition: []
        }
    };

    @observable appStores = [
        actorStore,
        flowStore,
        formPropertyStore,
        formStore,
        ifaceStore,
        ifaceTypeStore,
        imageStore,
        objectPropertyStore,
        objectStore,
        packageStore,
        requirementStore,
        ruleStore,
        stepObjectStore,
        stepStore,
        traceStore,
        useCaseStore,
        categoryStore,
        componentStore,
        projectStore
    ];

    @action
    getInitialData(releaseData) {
        this.clearStores();
        if (ENV_PRODUCTION) {
            // If loading release Data
            if (releaseData) {
                this.organiseData(releaseData);
            } else {
                return axios
                    .get("/app/component/reactload")
                    .then(response => {
                        if (response.data.status === 1) {
                            // Then we don't have a current session
                            if (LOGGING_ENABLED) {
                                console.log("Got Initial Data", response);
                            }
                            this.organiseData(response.data.content);
                            projectStore.setProjectIsSet(true);
                        } else if (response.data.status === 2) {
                            if (LOGGING_ENABLED) {
                                console.log("Project Not Set");
                            }
                            uiStore.router.push("/app/");
                        } else {
                            if (LOGGING_ENABLED) {
                                console.log(
                                    "Get Initial Data Response",
                                    response
                                );
                            }
                            throw new Error("Fetching data failed");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        } else {
            this.organiseData(importedData);
            userStore.followsList = importedData.projects.follows;
            userStore.projectsList = importedData.projects.projects;
            userStore.invitesList = importedData.projects.invites;
            projectStore.setProjectIsSet(true);
            // demoLibrary
        }
    }

    @action
    getMetaData() {
        if (ENV_PRODUCTION) {
            return axios.all([
                axios
                    .get("/app/project/reactprojects")
                    .then(response => {
                        if (response.data.status === 0) {
                            console.error("Error getting project list");
                        } else {
                            const projectData = response.data.content;
                            if (projectData.follows)
                                userStore.followsList = projectData.follows;
                            if (projectData.projects)
                                userStore.projectsList = projectData.projects;
                            if (projectData.invites)
                                userStore.invitesList = projectData.invites;
                        }
                    })
                    .catch(() => {}),
                axios.get("/app/library/reactlist").then(response => {
                    const libraryItems = response.data.content;
                    libraryStore.libraryData = Object.values(libraryItems);
                }),
                axios.get("/app/user/reactgetcurrentuser").then(response => {
                    if (LOGGING_ENABLED) {
                        console.log("user", response);
                    }
                    if (response.data.content.user) {
                        userStore.setUserDetails(response.data.content.user);
                    }
                })
            ]);
        } else {
            libraryStore.libraryData = importedLibrary.libraries;
        }
    }

    @action
    getExternalReleaseData() {
        this.clearStores();

        if (IS_EXTERNAL_RELEASE) {
            if (window.data) {
                this.organiseData({
                    components: window.data.components,
                    projectdetails: window.data.projectdetails
                });
            } else {
                throw new Error("No Data to display");
            }
        }
        if (IS_EXTERNAL_RELEASE && !ENV_PRODUCTION) {
            // this.organiseData(importedData)
        } else {
            return;
        }
        uiStore.setIsLoadingData(false);
    }

    @action
    setProject(id) {
        if (ENV_PRODUCTION) {
            uiStore.setIsLoadingData(true);
            axios
                .post(`/app/project/reactset`, "project[project]=" + id)
                .then(response => {
                    if (response.data.status !== 1) {
                        // alert('Error in setting project (temp warning)') // TODO: Temp warning | JH
                    }

                    console.log("reactset content", response.data.content);
                    this.clearStores();
                    this.organiseData(response.data.content);

                    return response;
                })
                .then(() => {
                    projectStore.setProjectIsSet(true);
                    uiStore.setIsLoadingData(false);
                    uiStore.router.push("/app/gather");
                });
        } else {
            uiStore.router.push("/app/gather");
        }
    }

    @action
    organiseData(data) {
        // console.log('data is',data)
        data.components.forEach(datum => {
            const model = createModelFromData(datum);
            this.appData.components[componentIdToName(datum.object)].push(
                model
            );
        });

        projectStore.setProjectDetails(data.projectdetails.details);
        projectStore.setReleases(data.projectdetails.releases);
        projectStore.setActivityData(data.projectactivity);
        // }

        if (!ENV_PRODUCTION) {
            projectStore.setActivityData(data.projectdetails.activityData);
        }

        this.loadData();
    }

    @action
    loadData() {
        this.appData.components.basic.forEach(basic => {
            // For legacy purposes, needed until we migrate numbers in the database
            basic.number = updateBasicNumber(basic.number);
        });

        requirementStore.groupData = this.appData.components.basic
            .filter(basic => {
                // Get all groups, that have parent_id as 0
                return basic.parent_id === "0" || basic.parent_id === "-1";
            })
            .map(group => {
                return extendObservable(group, { basicType: "group" });
                // return group = {...group, type: 'group', requirements: []}
            })
            .sort((a, b) => {
                return parseInt(a.number) > parseInt(b.number) ? 1 : -1;
            });

        requirementStore.requirementData = this.appData.components.basic.reduce(
            (output, basic) => {
                // Get all requirements, have parent which has type group
                // Expensive lookup....

                if (
                    requirementStore.groupData.some(group => {
                        if (group.persistent_id === basic.parent_id) {
                            group.children.push(basic);
                            return true;
                        }
                    })
                ) {
                    extendObservable(basic, { basicType: "requirement" });
                    return output.concat(basic);
                } else {
                    return output;
                }
            },
            []
        );

        requirementStore.groupData.forEach(group => {
            group.children = group.children.sort((a, b) => {
                return parseInt(a.number) > parseInt(b.number) ? 1 : -1;
            });
        });

        requirementStore.detailData = this.appData.components.basic.reduce(
            (output, basic) => {
                // Get all requirements, have parent which has type req
                // Expensive lookup....

                if (
                    requirementStore.requirementData.some(req => {
                        if (req.persistent_id === basic.parent_id) {
                            req.children.push(basic);
                            return true;
                        }
                    })
                ) {
                    extendObservable(basic, { basicType: "detail" });
                    return output.concat(basic);
                } else {
                    return output;
                }
            },
            []
        );

        requirementStore.requirementData.forEach(req => {
            req.children = req.children.sort((a, b) => {
                return parseInt(a.number) > parseInt(b.number) ? 1 : -1;
            });
        });

        this.appData.components.package.forEach(currentPackage => {
            // extendObservable(currentPackage, {useCases: []});
            this.appData.components.usecase.forEach(useCase => {
                if (useCase.parent_id === currentPackage.persistent_id) {
                    currentPackage.children.push(useCase);
                }
            });
            currentPackage.children = currentPackage.children.sort((a, b) => {
                return parseInt(a.number) > parseInt(b.number) ? 1 : -1;
            });
        });

        this.appData.components.usecase.forEach(useCase => {
            // extendObservable(useCase, {flows: []});
            this.appData.components.flow.forEach(flow => {
                if (useCase.persistent_id === flow.parent_id) {
                    useCase.children.push(flow);
                }
            });
        });

        this.appData.components.flow.forEach(flow => {
            // extendObservable(flow, {steps: []});
            this.appData.components.step.forEach(step => {
                if (flow.persistent_id === step.parent_id) {
                    flow.children.push(step);
                }
            });
            flow.children = flow.children.sort((a, b) => {
                // TODO: Make this a more rigorous test rather than stripping the last letter| JH
                let first = a.number,
                    second = b.number;
                if (first.substring(first.length - 1).match(/[a-zA-Z]/i)) {
                    first = first.substring(0, first.length - 1);
                }
                if (second.substring(second.length - 1).match(/[a-zA-Z]/i)) {
                    second = second.substring(0, second.length - 1);
                }
                // console.log('comparing',first,second, 'in flow:',flow.name);

                return parseInt(first) > parseInt(second) ? 1 : -1;
            });
            // console.log(flow.steps)
        });

        this.appData.components.form.forEach(form => {
            // extendObservable(form, {formProperties: []});
            this.appData.components.formproperty.forEach(formprop => {
                if (formprop.parent_id === form.persistent_id) {
                    form.children.push(formprop);
                }
            });
        });

        this.appData.components.object.forEach(object => {
            // extendObservable(object, {objectProperties: []});
            this.appData.components.objectproperty.forEach(objectprop => {
                if (objectprop.parent_id === object.persistent_id) {
                    object.children.push(objectprop);
                }
            });
        });

        this.appData.components.iface.forEach(iface => {
            this.appData.components.photo.forEach(photo => {
                if (photo.parent_id === iface.persistent_id) {
                    iface.children.push(photo);
                }
            });
        });

        actorStore.actorData = this.appData.components.actor;
        flowStore.flowData = this.appData.components.flow;
        formPropertyStore.formPropertyData = this.appData.components.formproperty;
        formStore.formData = this.appData.components.form;
        ifaceStore.ifaceData = this.appData.components.iface;
        ifaceTypeStore.ifaceTypeData = this.appData.components.interfacetype;
        imageStore.imageData = this.appData.components.photo;
        objectPropertyStore.objectPropertyData = this.appData.components.objectproperty;
        objectStore.objectData = this.appData.components.object;
        packageStore.packageData = this.appData.components.package;
        ruleStore.ruleData = this.appData.components.rule;
        stepObjectStore.stepObjectData = this.appData.components.stepobject;
        stepStore.stepData = this.appData.components.step;
        traceStore.traceData = this.appData.components.trace;
        useCaseStore.useCaseData = this.appData.components.usecase;
        categoryStore.categoryData = this.appData.components.category;

        (componentStore.componentData.rule =
            ruleStore.ruleData), (componentStore.componentData.form =
            formStore.formData), (componentStore.componentData.object =
            objectStore.objectData), (componentStore.componentData.iface =
            ifaceStore.ifaceData);

        // uiStore.setIsLoadingData(false);
    }

    @action clearStores = () => {
        this.appStores.forEach(store => {
            store.clearStore();
        });
        this.appData = {
            components: {
                rule: [],
                form: [],
                formproperty: [],
                actor: [],
                package: [],
                object: [],
                objectproperty: [],
                flow: [],
                step: [],
                usecase: [],
                photo: [],
                iface: [],
                interfacetype: [],
                stepobject: [],
                glossary: [],
                basic: [],
                trace: [],
                category: [],
                stepiface: [],
                steprule: [],
                simple: [],
                statetransition: []
            }
        };
    };

    @action
    handleDeleteResponse(arg) {
        console.log("Handle Delete Response");
        arg.forEach(i => {
            const store = getStoreFromId(i.object);
            store.clearItemFromStore(i.persistent_id);
        });
    }

    @action deleteProject = id => {
        this.clearStores();
        removeItemFromArray(userStore.projectsList, id, "id");
    };

    @action printStoresJSON = () => {
        // Outputs JSON of the application's stores for seeding the dev site
        const storeData = [
            actorStore.actorData,
            flowStore.flowData,
            formPropertyStore.formPropertyData,
            formStore.formData,
            ifaceStore.ifaceData,
            ifaceTypeStore.ifaceTypeData,
            imageStore.imageData,
            objectPropertyStore.objectPropertyData,
            objectStore.objectData,
            packageStore.packageData,
            ruleStore.ruleData,
            stepObjectStore.stepObjectData,
            stepStore.stepData,
            traceStore.traceData,
            useCaseStore.useCaseData,
            categoryStore.categoryData,
            requirementStore.groupData,
            requirementStore.requirementData,
            requirementStore.detailData
        ];

        const reduceStore = store => {
            return store.reduce((output, current) => {
                return output.concat({
                    id: current.id,
                    persistent_id: current.persistent_id,
                    number: current.number,
                    name: current.name,
                    text: current.text,
                    text2: current.text2,
                    text3: current.text3,
                    parent_id: current.parent_id,
                    related1_id: current.related1_id,
                    related2_id: current.related2_id,
                    type: current.type,
                    sequence: current.sequence,
                    flag: current.flag,
                    project_id: current.project_id,
                    release_id: current.release_id,
                    object: current.object
                });
            }, []);
        };

        const output = {};

        const components = storeData.reduce((output, current) => {
            return output.concat(reduceStore(current));
        }, []);

        output.components = components;

        output.projectdetails = {
            details: [
                {
                    project_id: "372",
                    project_name: "GoogleProject",
                    project_description: "A new project",
                    project_extlink: "d083f7cda4db681118dfea9a9de037d9",
                    user_id: "121",
                    firstname: "James",
                    lastname: "Billson",
                    email: "james@billson.com",
                    company_name: "Billson Fisher Consulting",
                    company_description:
                        "An IT consulting company specialising in analysis and strategy."
                }
            ],

            releases: [
                {
                    number: "0.0007",
                    id: "404",
                    status: "1"
                }
            ]
        };
        output.projects = {
            follows: [
                {
                    name: "A followed project",
                    description:
                        "ReqFire's most popular library item.  For all your Social Authentication needs",
                    id: "social",
                    changes: {
                        lastchange: "2017-06-08 22:05:06",
                        number: "123"
                    },
                    users: {
                        followers: [],
                        owners: [
                            {
                                email: "whatever@you.want",
                                firstname: "Dwayne",
                                lastname: "Johnson"
                            }
                        ]
                    }
                }
            ],
            projects: [
                {
                    name: "First Project",
                    description:
                        "ReqFire's most popular library item.  For all your Social Authentication needs",
                    id: "social",
                    changes: {
                        lastchange: "2017-06-08 22:05:06",
                        number: "123"
                    },
                    users: {
                        followers: [],
                        owners: [
                            {
                                email: "whatever@you.want",
                                firstname: "Dwayne",
                                lastname: "Johnson"
                            }
                        ]
                    }
                },
                {
                    name: "Snoring App",
                    description:
                        "Get your app ready for the latest trend in wearables",
                    id: "snoring",
                    changes: {
                        lastchange: "2017-06-08 22:05:06",
                        number: "123"
                    },
                    users: {
                        followers: [],
                        owners: [
                            {
                                email: "whatever@you.want",
                                firstname: "Dwayne",
                                lastname: "Johnson"
                            }
                        ]
                    }
                },
                {
                    name: "CoffeeSqueeze",
                    description:
                        "Suite of components and Use Cases to get you up and running with PayPal",
                    id: "coffeesqueeze",
                    changes: {
                        lastchange: "2017-06-08 22:05:06",
                        number: "123"
                    },
                    users: {
                        followers: [],
                        owners: [
                            {
                                email: "whatever@you.want",
                                firstname: "Dwayne",
                                lastname: "Johnson"
                            }
                        ]
                    }
                },
                {
                    name: "New York Butter Factory",
                    description:
                        "A systematic approach to convey all your analytics in your next project",
                    id: "newyorkbutter",
                    changes: {
                        lastchange: "2017-06-08 22:05:06",
                        number: "123"
                    },
                    users: {
                        followers: [],
                        owners: [
                            {
                                email: "whatever@you.want",
                                firstname: "Dwayne",
                                lastname: "Johnson"
                            }
                        ]
                    }
                }
            ],
            invites: []
        };
        console.log(JSON.stringify(output, null, 2));
    };
}

function getStoreFromId(id) {
    switch (id) {
        case "1":
            return ruleStore;
        case "2":
            return formStore;
        case "3":
            return formPropertyStore;
        case "4":
            return actorStore;
        case "5":
            return packageStore;
        case "6":
            return objectStore;
        case "7":
            return objectPropertyStore;
        case "8":
            return flowStore;
        case "9":
            return stepStore;
        case "10":
            return useCaseStore;
        case "11":
            return imageStore;
        case "12":
            return ifaceStore;
        case "13":
            return ifaceTypeStore;
        case "14":
            return stepObjectStore;
        case "15":
            return stepObjectStore;
        case "16":
            return stepObjectStore;
        case "17":
            return categoryStore;
        case "18":
            return "simple"; // TODO: What to do in this case?/ | JH
        case "19":
            return "statetransition";
        case "20":
            return "glossary";
        case "21":
            return requirementStore;
        case "22":
            return traceStore;
        default:
            break;
    }
}

const mainStore = new MainStore();

export default mainStore;
