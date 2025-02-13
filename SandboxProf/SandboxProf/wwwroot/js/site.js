// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Esta sección de código es sincrónica, por ende, se ejecuta solo una a la vez.
$(document).ready(function () {

    GetNationalities();
    LoadData();

    $(document).on('submit', '#student-entry-form', function () {

        if ($('#id').val() == '') {

            Add();
        } else {

            UpdateStudent();
        }
        return false;
    });

});

function Add() {
    var student = {
        name: $('#name').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        nationality_id: parseInt($('#nationality').val())
    };

    var nationality = {

        id: parseInt($('#nationality').val()),
        name: $('#nationality').find('option:selected').text()
        //TBD code: 
    };

    student.nationality = nationality;

    if (student.name == '' || student.email == '' || student.password == '' || nationality.name == 'Select your nationality') {
        $('#validation').text("Please complete the form");
        $('#validation').css('color', 'red');
    } else { 
 
        $.ajax({ //ASYNCHRONOUS JAVASCRIPT AND XML
            url: "/Home/Insert",
            data: JSON.stringify(student), //converte la variable estudiante en tipo json
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) { //result proviene del controller

                $('#name').val('');
                $('#email').val('');
                $('#password').val('');
                $('#nationality').val(0);

                $('#validation').text("Registered successfully");
                $('#validation').css('color', 'green');

                LoadData();
            },
            error: function (errorMessage) {
                $('#password').val('');
                $('#validation').text("An error occurred");
                $('#validation').css('color', 'red');
            }
        });
    }
}

function UpdateStudent() {

    var student = {
        id: $('#id').val(),
        name: $('#name').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        nationalityId: parseInt($('#nationality').val())

    };

    var nationality = {

        id: parseInt($('#nationality').val()),
        name: $('#nationality').find('option:selected').text()

    };

    student.nationality = nationality;

    if (student.name == '' || student.email == '' || student.password == '' || nationality.name == 'Select your nationality') {

        $('#validation').text("Please complete the form");
        $('#validation').css('color', 'red');

    } else {

        $.ajax({
            url: "/Home/UpdateStudent",
            data: JSON.stringify(student), //converte la variable estudiante en tipo json
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                $('#validation').text("Updated successfully");
                $('#validation').css('color', 'green');
                $('#id').val('');
                $('#name').val('');
                $('#email').val('');
                $('#password').val('');
                $('#nationality').val($("#nationality option:first").val());

                LoadData();
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#validation').text("Error en la conexión.");
                }
                $('#validation').text("User not added");
                $('#validation').css('color', 'red');
                $('#password').val('');
            }
        });

    }
}


function GetNationalities() {
    $.ajax({ //ASYNCHRONOUS JAVASCRIPT AND XML
        url: "/Home/GetNationalities",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) { //result proviene del controller

            var htmlSelect = '';

            $.each(result, function (key, item) {
                htmlSelect += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            $('#nationality').append(htmlSelect);
            
        },
        error: function (errorMessage) {
            //TO DO
        }
    });
}

function GetStudentByEmail(email) {
    $.ajax({ //ASYNCHRONOUS JAVASCRIPT AND XML
        url: "/Home/GetStudentByEmail/" + email,
        type: "GET",
        data: {email: email},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) { //result proviene del controller
            $('#id').val(result.id);
            $('#name').val(result.name);
            $('#email').val(result.email);
            $('#nationality').val(result.nationality.id);

        },
        error: function (errorMessage) {
            //TO DO
        }
    });
}

function DeleteStudent(email) {

    if (confirm("Are you sure to delete the student?") == true) {
        $.ajax({ //ASYNCHRONOUS JAVASCRIPT AND XML
            url: "/Home/DeleteStudent/" + email,
            type: "GET",
            data: { email: email },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) { //result proviene del controller
                $('#validation').text("Student deleted successfully");
                $('#validation').css('color', 'green');
                LoadData();
            },
            error: function (errorMessage) {

            }
        });
    } else {
        alert("The student has not been deleted");
    }   
}

function LoadData() {
    $.ajax({ //ASYNCHRONOUS JAVASCRIPT AND XML
        url: "/Home/GetAllStudents",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) { //result proviene del controller

            var htmlTable = '';

            $.each(result, function (key, item) {
                htmlTable += '<tr>';
                htmlTable += '<td>' + item.id + '</td>';
                htmlTable += '<td>' + item.name + '</td>';
                htmlTable += '<td>' + item.email + '</td>';
                htmlTable += '<td>' + item.nationality.name + '</td>'
                htmlTable += '<td> <a href="#about" onclick="GetStudentByEmail(\'' + item.email + '\' )">Edit</a> | <a href="#about" onclick="DeleteStudent(\'' + item.email + '\' )">Delete</a> </td>';
                htmlTable += '</tr>';
            });
            $('#students-tbody').empty();
            $('#students-tbody').html(htmlTable); //shows table on screen
            

        },
        error: function (errorMessage) {
            //TO DO
            alert(errorMessage.responseText);
        }
    });
}

