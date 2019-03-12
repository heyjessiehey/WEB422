
/************************************************************************************************ 
 * WEB422 – _Assignment 1 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source 
 * (including web sites) or distributed to other students. 
 * 
 * Name: Jessie Gayeon Ko    Student ID: 040704124       Date: Jan 12, 2019 
 * 
 ***********************************************************************************************/


$(function () {
    console.log("jQuery working");

    $("#teams-menu").on("click", function (event) {

        event.preventDefault();

        $.ajax({
            url: "https://glacial-castle-34884.herokuapp.com/teams", // change "your teams api url" to your Teams API url on Heroku
            type: "GET",
            //data: JSON.stringify({ some: "data" }), // we can also send data using the "data" option
            contentType: "application/json"
        })
            .done(function (data) {
                $(".well").empty().append("<h3>Teams</h3>").append(JSON.stringify(data));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            });
    });
    
    $("#employees-menu").on("click", function (event) {
        event.preventDefault();

        $.ajax({
            url: "https://glacial-castle-34884.herokuapp.com/employees", // change "your teams api url" to your Teams API url on Heroku
            type: "GET",
            //data: JSON.stringify({ some: "data" }), // we can also send data using the "data" option
            contentType: "application/json"
        })
            .done(function (data) {
                $(".well").empty().append("<h3>Employees</h3>").append(JSON.stringify(data));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            });
    });

    $("#projects-menu").on("click", function (event) {
        event.preventDefault();

        $.ajax({
            url: "https://glacial-castle-34884.herokuapp.com/projects", // change "your teams api url" to your Teams API url on Heroku
            type: "GET",
            //data: JSON.stringify({ some: "data" }), // we can also send data using the "data" option
            contentType: "application/json"
        })
            .done(function (data) {
                $(".well").empty().append("<h3>Projects</h3>").append(JSON.stringify(data));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            })
    });

    $("#positions-menu").on("click", function (event) {
        event.preventDefault();

        $.ajax({
            url: "https://glacial-castle-34884.herokuapp.com/positions", // change "your teams api url" to your Teams API url on Heroku
            type: "GET",
            //data: JSON.stringify({ some: "data" }), // we can also send data using the "data" option
            contentType: "application/json"
        })
            .done(function (data) {
                $(".well").empty().append("<h3>Positions</h3>").append(JSON.stringify(data));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            });
    });
});
