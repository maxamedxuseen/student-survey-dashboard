let uriAll = "http://localhost:2000/api/feedback/report/";
let uriSurvey = "http://localhost:2000/api/survey/";
let uriStudents = "http://localhost:2000/api/feedback/students/";
let uriEachQuestion = "http://localhost:2000/api/feedback/question/";

// getChart(1)


$(document).ready(function () {
  GetallData();

  $("#SurveyList").on('change',function (){
    console.log($("#SurveyList").val());

    getReport($("#SurveyList").val())
    getStudents($("#SurveyList").val())
    
  })

 });
 

function GetallData() {
  $.ajax({
    url: uriSurvey,
    type: "GET",
    dataType: "json",
    success: function (data) {
      
      $.each(data, function (idx, item) {
        $("#SurveyList").append(`
        <option value="${item.id}">${item.survey_name}</option>
        `)
       
      });
      
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}

function getReport(id){
  $("#tbodydata").empty();
  var $list = $("#tbodydata");
  $.ajax({
    url: uriAll+id,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      $.each(data, function (idx, item) {
        var $tr = $("<tr></tr>");
        $tr.append(`<td>${idx + 1} </td>`);
        $tr.append("<td>" + item.question + "</td>");
        $tr.append("<td>" + item.Strongly_agree + "</td>");
        $tr.append("<td>" + item.Agree + "</td>");
        $tr.append("<td>" + item.Neutral + "</td>");
        $tr.append("<td>" + item.Disagree + "</td>");
        $tr.append("<td>" + item.Strongly_disagree + "</td>");
        $tr.append("<td>" + item.total_answers + "</td>");
        $tr.append(`<td>
                <button
                      type="button"
                      onclick="getChart(${item.survey_id},${item.question_id})"
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
        $.each(data, function (idx, item) {
          var $tr = $("<tr></tr>");
          $tr.append(`<td>${idx + 1} </td>`);
          $tr.append("<td>" + item.student_name + "</td>");
          
          
          
          $list.append($tr);
        });
        $("#table0").DataTable();
        },
      error: function (request, msg, error) {
          console.log("Error in Operation");
        },
  
  })

}
function getStudents(id){
  $("#tbodydatas").empty();
  var $list = $("#tbodydatas");
  $.ajax({
    url: uriStudents+id,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      $.each(data, function (idx, item) {
        var $tr = $("<tr></tr>");
        $tr.append(`<td>${idx + 1} </td>`);
        $tr.append("<td>" + item.student_name + "</td>");
        $tr.append("<td>" + item.fcl_Name + "</td>");
        $tr.append("<td>" + item.total_answers + "</td>");
        // $tr.append(`<td>
        //         <button
        //               type="button"
        //               onclick="moreInfo(${item.question_id})"
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


// function getChart(id,qid) {
//   let reportDate = [];

//   $.ajax({
//     url: uriEachQuestion + id + "/" + qid,
//     type: "GET",
//     dataType: "json",
//     success: function (data) {
//     //   console.log(data);
//       $.each(data, function (idx, item) {
//         reportDate.push(item)
//         console.log(item);
//       });
//     },
//     error: function (request, msg, error) {
//       swal("sorry", "something went wrong!","warning")
//     },
//   });

//   var ctx = document.getElementById("myChart").getContext("2d");
//   var chart = new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: [
//           "Strongly agree",
//           "Agree",
//           "Neutral",
//           "Disagree",
//           "Strongly disagree",
//       ],
//       datasets: [
//         {
//           label: "Responses",
//           data: reportDate,
//           backgroundColor: "rgba(54, 162, 235, 0.2)",
//           borderColor: "rgba(54, 162, 235, 1)",
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//         ],
//       },
//     },
//   });
// }

function getChart(id,qid) {
  let reportDate = [];

  $.ajax({
    url: uriEachQuestion + id + "/" + qid,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);

      // Extract the last five data points and remove the 'question_id'
      const responseKeys = Object.keys(data).slice(-5);
      reportDate = responseKeys.map(key => data[key]);

      // Create the chart here, inside the success callback
      var ctx = document.getElementById("myChart").getContext("2d");
      var chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Strongly agree",
            "Agree",
            "Neutral",
            "Disagree",
            "Strongly disagree",
          ],
          datasets: [
            {
              label: "Responses",
              data: reportDate,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
    error: function (request, msg, error) {
      swal("sorry", "something went wrong!", "warning");
    },
  });
}
