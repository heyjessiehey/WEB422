/************************************************************************************************ 
 * WEB422 – _Assignment 3 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source 
 * (including web sites) or distributed to other students. 
 * 
 * Name: Jessie Gayeon Ko    Student ID: 040704124       Date: Feb 7, 2019 
 * 
 * 
 ***********************************************************************************************/
let viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])
}

function showGenericModal(title, message){
    $("#genericModal .modal-title").empty().append(title);
    $("#genericModal .modal-body").empty().append(message);

    //programmatically show your generic modal using id
    $("#genericModal").modal('show'); 
}

function initializeTeams(){
    
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "https://glacial-castle-34884.herokuapp.com/teams-raw",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            viewModel.teams = ko.mapping.fromJS(data);;
            resolve();
        })
        .fail(function (err) {
            reject("Error loading the team data.");
        });
    });
}

function initializeEmployees(){
    
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "https://glacial-castle-34884.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            viewModel.employees = ko.mapping.fromJS(data);;
            resolve();
        })
        .fail(function (err) {
            reject("Error loading the employee data.");
        });
    });
}

function initializeProjects(){
    
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "https://glacial-castle-34884.herokuapp.com/projects",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            viewModel.projects = ko.mapping.fromJS(data);
            resolve();
        })
        .fail(function (err) {
            reject("Error loading the 'project' data.");
        });
    });
}
function saveTeam(){
    let currentTeam = this; // this is team object from viewModel.temas array

    $.ajax({
        url: "https://glacial-castle-34884.herokuapp.com/team/" + currentTeam._id(),
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            "Projects": currentTeam.Projects(),
            "Employees": currentTeam.Employees(),
            "TeamLead": currentTeam.TeamLead()
        })
    })
    .done(function (data) {
      showGenericModal("Success", currentTeam.TeamName() + " Updated Successfully")
    })
    .fail(function (err) {
       showGenericModal("Error", "Error updating the team information.")
    });
}

$(function(){
    console.log("jQuery working");
    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(function(){
        ko.applyBindings(viewModel);
        $('select.multiple').multipleSelect({filter: true});
        $('select.single').multipleSelect({single: true,filter: true});
    }).catch(function(err){
        showGenericModal("Error", err);
    })
});


