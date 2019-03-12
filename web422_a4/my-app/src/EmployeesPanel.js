import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const API = 'https://glacial-castle-34884.herokuapp.com/';

class EmployeesPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            employees:[]
        }
    }

    componentDidMount(){
        fetch(API + 'employees')
        .then(response => response.json()) // convert data to array of objects 
        .then(data =>
            this.setState({
                employees: data
            })
        )
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
                                {this.state.employees.map((element,index)=>{
                                    return(
                                        <tr key={element._id}>
                                            <td>{element.FirstName} {element.LastName}</td>
                                            <td>{element.Position.PositionName}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/employees" className="btn btn-primary form-control">View All Employee Data</Link>
                </div>
            </div>
        );
    }
}

export default EmployeesPanel;