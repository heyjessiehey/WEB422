import React, { Component } from 'react';
import MainContainer from './MainContainer.js'
import moment from 'moment'

const API = 'https://glacial-castle-34884.herokuapp.com/';

class Employees extends Component{
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
            <MainContainer sidebar="Employees">
            <h1 className="page-header">Employees</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <td>Name & Position</td>
                        <td>Address</td>
                        <td>Phone Num</td>
                        <td>Hire Date</td>
                        <td>Salary Bonus</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.employees.map(element =>{
                        return(
                          <tr key ={element._id}>
                            <td>{element.FirstName} {element.LastName} - {element.Position.PositionName}</td>
                            <td>{element.AddressStreet}, {element.AddressCity} {element.AddressState}, {element.AddressZip}</td>
                            <td>{element.PhoneNum} ex: {element.Extension}</td>
                            <td>{moment(element.HireDate).utc().format('LL')}</td>
                            <td>$ {element.SalaryBonus}</td>
                          </tr>  
                        );
                    })}
                </tbody>
            </table>
            </MainContainer>
        );
    }
}

export default Employees;