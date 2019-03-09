import React, {Component} from 'react';
import MainContainer from './MainContainer.js'

const API = 'https://glacial-castle-34884.herokuapp.com/';

class Teams extends Component{
    constructor(props){
        super(props);
        this.state = {
            teams:[]
        }
    }

    componentDidMount(){
        fetch(API + 'teams')
        .then(response => response.json())
        .then(data =>
            this.setState({
                teams: data
            })
        )
    }

    render(){
        return(
            <MainContainer sidebar="Teams">
                <h1 className="page-header">Teams</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Projects</td>
                            <td>Employees</td>
                            <td>Team Lead</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map(element =>{
                            return(
                              <tr key ={element._id}>
                                <td>{element.TeamName}</td>
                                <td>{element.Projects.map(e => {
                                    return(
                                        <li key={e._id}>{e.ProjectName}</li>
                                    )
                                })}</td>
                                <td>{element.Employees.length} Employees</td>
                                <td>{element.TeamLead.FirstName} {element.TeamLead.LastName}</td>
                              </tr>  
                            );
                        })}
                    </tbody>
                </table>
            </MainContainer>
        );
    }
}

export default Teams;