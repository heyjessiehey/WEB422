/************************************************************************************************ 
 * WEB422 – _Assignment 2 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source 
 * (including web sites) or distributed to other students. 
 * 
 * Name: Jessie Gayeon Ko    Student ID: 040704124       Date: Feb 1, 2019 
 * 
 * 
 ***********************************************************************************************/
let employeesModel = [];

function initializeEmployeesModel(){
    $.ajax({
        url: "https://glacial-castle-34884.herokuapp.com/employees",
        type: "GET",
        contentType: "application/json"
    })
    .done(function(employees){
        employeesModel = _.take(employees, 300);
        refreshEmployeeRows(employeesModel);
    })
    .fail(function(err){
        showGenericModal('Error', 'Unalbe to get Emplyees');
    })
};

function showGenericModal(title, message){
    $("#genericModal .modal-title").empty().append(title);
    $("#genericModal .modal-body").empty().append(message);

    //programmatically show your generic modal using id
    $("#genericModal").modal('show'); 
};

function refreshEmployeeRows(employees){
    //escape and evaluate
    let rowTemplate = _.template( 
        '<%_.forEach(employees, function(employee){ %>' +
            '<div class="row body-row" data-id="<%- employee._id %>">' +
                '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' +
                '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
                '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
            '</div>' +
        '<% }); %>'
    );

    let rows = rowTemplate({'employees': employees})
    console.log(rows);
    $("#employees-table").empty();
    $("#employees-table").append(rows);
};

function getFilteredEmployeesModel(filterString){
    let filterStringLower = filterString.toLowerCase();
    let filtered = _.filter(employeesModel, function(employee){
        return employee.FirstName.toLowerCase().match(filterStringLower) ||employee.LastName.toLowerCase().match(filterStringLower) ||
                employee.Position.PositionName.toLowerCase().match(filterStringLower);
    });
    return filtered;
};

function getEmployeeModelById(id){
    let filtered = _.find(employeesModel, function(employee){
        return employee._id == id;
    });
    return filtered == null ? null : _.cloneDeep(filtered);
};
$(function(){
    console.log("jQuery working");
    initializeEmployeesModel();

    $( "#employee-search").on("keyup", function(event){
        let filterEmp = getFilteredEmployeesModel(this.value);
        refreshEmployeeRows(filterEmp);
    });
    $(document.body).on('click', '.body-row' ,function(emp){
        let employee = getEmployeeModelById($(this).attr("data-id"));
        
        if(employee != null){         
            employee.HireDate = moment(employee.HireDate).format('LL');
            
            let modalContentTemplate = _.template(
                '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %>, <%- employee.AddressState %>. <%- employee.AddressZip %></br>' + 
                '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%- employee.Extension %></br>' +
                '<strong>Hire Date:</strong> <%- employee.HireDate %>' 
              );

              let modalContent = modalContentTemplate({'employee': employee});
        
              showGenericModal(employee.FirstName + ' ' + employee.LastName, modalContent);
        }
    });
});

