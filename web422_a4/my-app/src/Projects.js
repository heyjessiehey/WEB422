import React, {Component} from 'react';
import MainContainer from './MainContainer.js'
import moment from 'moment'

const API = 'https://glacial-castle-34884.herokuapp.com/';

class Projects extends Component{
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
            <MainContainer sidebar="Projects">
                <h1 className="page-header">Projects</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map(element =>{
                            let endDate = element.ProjectEndDate ? element.ProjectEndDate : "n/a";
                            return(
                              <tr key ={element._id}>
                                <td>{element.ProjectName}</td>
                                <td>{element.ProjectDescription}</td>
                                <td>{moment(element.ProjectStartDate).utc().format('LL')}</td>
                                <td>{endDate}</td>
                              </tr>  
                            );
                        })}
                    </tbody>
                </table>
            </MainContainer>
        );
    }
}

export default Projects;