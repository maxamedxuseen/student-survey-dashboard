// get users


let uriAll = "http://localhost:2000/api/category/";

$(document).ready(function () {
  console.log("ready!");
  
  GetallData();

  $("#editt").on("click", function () {
    editThis();
  });

  $("#addNew").on("click", function () {
    addNewUser()
  });
});

function GetallData() {
  $("#tbodydata").empty();
  var $list = $("#tbodydata");
  $.ajax({
    url: uriAll,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      $.each(data, function (idx, item) {
        var $tr = $("<tr></tr>");
        $tr.append(`<td>${idx + 1} </td>`);
        $tr.append("<td>" + item.category + "</td>");
  
        $tr.append(`<td>
                <button
                      type="button"
                      onclick="moreInfo(${item.id})"
                      class="btn btn-warning"
                      data-toggle="modal"
                      data-target="#exampleModal1"
                    >
                       <i class="fa fa-edit"></i>
                    </button>
                </td>`);
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
            $("#UpName").val(data[0].category);
          

        },
        error: function (request, msg, error) {
            console.log("Error in Operation");
          },
    
    })

}


function editThis() {
  let Id = $("#upId").val()
  let NewCategory = {
    category: $("#UpName").val() ,
  
  };
  $.ajax({
    url: uriAll+Id,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(NewCategory),
    success: function (data) {
      
      swal({
        title: "DONE!",
        text: " Category has been Updated",
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

  let NewCategory = {
    category: $("#uName").val() ,
    
  };
  $.ajax({
    url: uriAll,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(NewCategory),
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