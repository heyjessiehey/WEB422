import React, {Component} from 'react';
import MainContainer from './MainContainer.js'
import ProjectsPanel from './ProjectsPanel.js'
import TeamsPanel from './TeamsPanel.js'
import EmployeesPanel from './EmployeesPanel.js'

class Overview extends Component{
    render(){
        return(
            <MainContainer sidebar="Overview">
                <h1 className="page-header">Overview</h1>
                <div className="row">
                    <div className="col-md-4">
                        <ProjectsPanel />
                    </div>
                    <div className="col-md-4">
                        <TeamsPanel />
                    </div>
                    <div className="col-md-4">
                        <EmployeesPanel />
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default Overview;
