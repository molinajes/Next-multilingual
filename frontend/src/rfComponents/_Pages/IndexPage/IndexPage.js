import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

// import glamorous from "glamorous";

import { AppContainer, PageContainer } from "../../_Atoms/Structure";
import { SectionContainer } from "../../_Molecules/Section";

import IndexNavigation from "../../Navigation/IndexNavigation";
import PageHeader from "../../Navigation/PageHeader";

import ProjectList from "./ProjectList/ProjectList";

import pageTitles from "../../../assets/pageTitles.json";

@inject("mainStore", "uiStore")
@observer
class IndexPage extends Component {
    static propTypes = {
        uiStore: PropTypes.object.isRequired,
        mainStore: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { uiStore, mainStore } = this.props;
        uiStore.setActivePage("");
        document.title = pageTitles.index;

        mainStore.getMetaData();
    }

    render() {
        return (
            <AppContainer>
                <IndexNavigation />
                <PageContainer>
                    <PageHeader
                        pageName={"Welcome back,"}
                        iconName="np_launch_project"
                    >
                        This is the home for all your projects.
                        Need inspiration? Have a look at a Featured project to
                        help you get started.
                    </PageHeader>
                    <SectionContainer>
                        <ProjectList />
                    </SectionContainer>
                </PageContainer>
            </AppContainer>
        );
    }
}
export default IndexPage;
