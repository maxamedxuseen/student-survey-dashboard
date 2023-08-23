// get users


let uriAll = "http://localhost:2000/api/survey/";
let uriSuTime = "http://localhost:2000/api/survey_time/";

$(document).ready(function () {
  console.log("ready!");
  selectInfo();

  $("#sYearsList").on('change',function (){
    console.log($("#YearsList").val());

    GetallData($("#sYearsList").val())
    
  })
  
});

function selectInfo() {
  $("#sYearsList").empty();
  $.ajax({
    url: uriSuTime,
    type: "GET",
    dataType: "json",
    success: function (data) {
      $("#sYearsList").append(`
      <option value="" disabled selected>select name</option>
      `);
      $.each(data, function (idx, item) {
        $("#sYearsList").append(`
        <option value="${item.id}">${item.year_name}</option>
        `);
      });
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}
let startingYear = new Date(survTime.staring_date).getFullYear();
  let currentYear = new Date().getFullYear();

function GetallData(id) {
  $("#tbodydata").empty();
  var $list = $("#tbodydata");
  $.ajax({
    url: uriAll + id,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      $.each(data, function (idx, item) {
        var $tr = $("<tr></tr>");
        $tr.append(`<td>${idx + 1} </td>`);
        $tr.append("<td>" + item.survey_name + "</td>");
        $tr.append("<td>" + item.category + "</td>");
        $tr.append("<td>" +  item.year_name + "</td>");
        // if(item.status === "Active"){
        //   $tr.append(`<td><span class="badge badge-success p-3"> Active</span> </td>`);
        // }else{
        //   $tr.append(`<td><span class="badge badge-secondary p-3"> In Active</span> </td>`);
        // }
        
  
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

      window.location.reload();
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