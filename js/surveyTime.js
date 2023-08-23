// get users
let uri = "https://bytesotech.cloud/target/api/role/";
let Geturl = "https://bytesotech.cloud/target/api/ads/customers/data/";

let uriAll = "http://localhost:2000/api/survey_time/";

$(document).ready(function () {
  console.log("ready!");
  
  GetallData();
  
  // Get the current date
  var currentDate = new Date();

  // Set the minimum date for the start date input to the current date
  var startInput = document.getElementById("sStart");
  startInput.min = currentDate.toISOString().slice(0, 10);

  // Set the minimum date for the deadline input to the current date
  var deadlineInput = document.getElementById("sDeadline");
  deadlineInput.min = currentDate.toISOString().slice(0, 10);

  $("#editt").on("click", function () {
    editThis();
  });

  $("#addNew").on("click", function () {
    addNewUser()
  });
});

function GetallData() {
  $("#tbodydatas").empty();
  var $list = $("#tbodydatas");
  $.ajax({
    url: uriAll,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      $.each(data, function (idx, item) {
        var $tr = $("<tr></tr>");
        $tr.append(`<td>${idx + 1} </td>`);
        $tr.append("<td>" + item.year_name+ "</td>");
        $tr.append("<td>" + extractDate(item.staring_date) + "</td>");
        $tr.append("<td>" + extractDate(item.end_date) + "</td>");
        // $tr.append(`<td>
        //         <button
        //               type="button"
        //               onclick="moreInfo(${item.id})"
        //               class="btn btn-warning"
        //               data-toggle="modal"
        //               data-target="#exampleModal1"
        //             >
        //                <i class="fa fa-edit"></i>
        //             </button>
        //         </td>`);
        $list.append($tr);
      });
      $("#table0").DataTable();
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}

function moreInfo(id){
    
    
    $.ajax({
        url: uriAll+id,
        type: "GET",
        dataType: "json",
        success: function (data) {
          $("#upId").val(data[0].id)
            $("#UpName").val(data[0].name);
            $("#upEmial").val(data[0].email);
            $("#upUser").val(data[0].username);
            $("#uppass").val(data[0].password);

        },
        error: function (request, msg, error) {
            console.log("Error in Operation");
          },
    
    })

}


function editThis() {
  let Id = $("#upId").val()
  let user = {
    name: $("#UpName").val() ,
    email: $("#upEmial").val(),
    username: $("#upUser").val(),
    password: $("#uppass").val(),
  };
  $.ajax({
    url: uriAll+Id,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(user),
    success: function (data) {
      
      swal({
        title: "DONE!",
        text: " User has been Updated",
        type: "success",
      }).then((okay) => {
        if (okay) {
          window.location.reload();
        }
      });
    },
    error: function (request, msg, error) {
      console.log("Can not post");

      GetallData();
    },
  });

}





function addNewUser() {
  let survTime = {
    year_name: $("#uName").val(),
    staring_date: $("#sStart").val(),
    end_date: $("#sDeadline").val(),
  };

  // Parse the starting date to extract the year
  let startingYear = new Date(survTime.staring_date).getFullYear();
  let currentYear = new Date().getFullYear();

  // Check if the starting year is the same as the current year
  
    $.ajax({
      url: uriAll,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(survTime),
      success: function (data) {
        swal({
          title: "DONE!",
          text: "User has been Added",
          type: "success",
        }).then((okay) => {
          if (okay) {
            window.location.reload();
          }
        });
      },
      error: function (request, msg, error) {
        console.log("Can not post");
        GetallData();
      },
    });
  
}


// date convertion 

function extractDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }