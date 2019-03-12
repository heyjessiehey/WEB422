import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const API = 'https://glacial-castle-34884.herokuapp.com/';

class TeamsPanel extends Component{
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

    componentWillUnmount(){

    }

    render(){
        return(
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">{this.props.title}</h3>
                </div>
                <div className="panel-body">
                  <div className="table-responsive overview-table">
                    <table className="table table-striped table-bordered">
                      <tbody>
                          {this.state.teams.map((element,index)=>{
                              return(
                                <tr key={element._id}>
                                    <td>{element.TeamName}</td>
                                    <td>{element.Employees.length} Employees</td>
                                </tr>
                              )
                          })}
                      </tbody>
                    </table>
                  </div>
                  <Link to="/teams" className="btn btn-primary form-control">View All Team Data</Link>
                </div>
              </div>

        );
    }
}

export default TeamsPanel