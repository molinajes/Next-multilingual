import React, { Component } from "react";
// import PropTypes from "prop-types";
import { observer /*inject*/ } from "mobx-react";

import ProjectNavigation from "../../Navigation/ProjectNavigation";
import PageHeader from "../../Navigation/PageHeader";

import { AppContainer, PageContainer } from "../../_Atoms/Structure";
import { SectionContainer, SectionPanel } from "../../_Molecules/Section";

import DevTasksContent from "./DevTasksContent";

// @inject('')
@observer
class ProgressPage extends Component {
    static propTypes = {};

    render() {
        // const {

        // } = this.props;

        return (
            <AppContainer>
                <ProjectNavigation />
                <PageContainer>
                    <PageHeader pageName={"Dev Tasks"} />
                    <SectionContainer>
                        <SectionPanel>
                            <DevTasksContent />
                        </SectionPanel>
                    </SectionContainer>
                </PageContainer>
            </AppContainer>
        );
    }
}

export default ProgressPage;
