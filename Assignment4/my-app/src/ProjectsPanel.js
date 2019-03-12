import React, { Component } from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom';

const API = 'https://glacial-castle-34884.herokuapp.com/';

class ProjectsPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            projects:[]
        }
    }

    componentDidMount(){
        fetch(API + 'projects')
        .then(response => response.json())
        .then(data =>
            this.setState({
                projects: data
            })
        )
    }

    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Projects</h3>
                </div>
                <div className="panel-body">
                    <div className="table-responsive overview-table">
                        <table className="table table-striped table-bordered">
                            <tbody>
                                {this.state.projects.map((element, index)=>{
                                    return(
                                        <tr key={element._id}>
                                            <td>{element.ProjectName}</td>
                                            <td>Active {moment().diff(element.ProjectStartDate, 'days')} Days</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/projects" className="btn btn-primary form-control">View All Project Data</Link>
                </div>
            </div>
        );
    }
}

 export default ProjectsPanel;