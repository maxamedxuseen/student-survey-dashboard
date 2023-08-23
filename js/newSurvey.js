let uriSurvey = "http://localhost:2000/api/survey/";
let uriQuestion = "http://localhost:2000/api/questions/";

let uriCatagory = "http://localhost:2000/api/category/";
let uriAllS = "http://localhost:2000/api/survey_time/";


$(document).ready(function () {

  selectInfo();
  selectInfoSuT();
  //
  $("#addQuestion").on("click", function () {
    $("#questions").append(`
            <div class="form-group">
                <div class="row">
                    <div class="col-10">
                        <input type="text" class="question form-control" />
                    </div>
                    <div class="col-2">
                        <button type="button" class="btn btn-danger float-right RemoveThis">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `);
  });

  $(document).on("click", ".RemoveThis", function () {
    $(this).closest(".form-group").remove();
  });

  $("#btn-submit").on("click", () => {
    swal({
      title: "Are you done?",
      text: "Please double check before you submit. If you are sure, click Submit.",
      type: "info",
      showCancelButton: true,
      cancelButtonText: "Double check",
      confirmButtonText: "Submit",
    }).then((result) => {
      if (result.value) {
        addNew();
      }
    });
    
  });
});

function selectInfo() {
  $("#sCategory").empty();
  $.ajax({
    url: uriCatagory,
    type: "GET",
    dataType: "json",
    success: function (data) {
      $("#sCategory").append(`
      <option value="" disabled selected>select Catagory</option>
      `);
      $.each(data, function (idx, item) {
        $("#sCategory").append(`
        <option value="${item.id}">${item.category}</option>
        `);
      });
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}
function selectInfoSuT() {
  $("#sSuTime").empty();
  $.ajax({
    url: uriAllS,
    type: "GET",
    dataType: "json",
    success: function (data) {
      $("#sSuTime").append(`
      <option value="" disabled selected>select Catagory</option>
      `);
      $.each(data, function (idx, item) {
        $("#sSuTime").append(`
        <option value="${item.id}">${item.year_name}</option>
        `);
      });
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}

function addNew() {
  
  let NewSurvey = {
    survey_name: $("#sName").val(),
    catagory_id: $("#sCategory").val(),
    survey_timeId: $("#sSuTime").val(),
  };
  // console.log(NewSurvey);
  $.ajax({
    url: uriSurvey,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(NewSurvey),
    success: function (data) {
      // console.log(data)
      submitSurvey(data.insertId);
    },
    error: function (request, msg, error) {
      console.log("Can not post");

      swal("Sorry", "something went wrong!", "error");
    },
  });
}

function submitSurvey(survey_iD) {
  var questions = document.querySelectorAll(".question");
  var questionValues = [];
  questions.forEach(function (question) {
    questionValues.push(question.value);
    if(question.value !== null || question.value !== "" || question.value !== " "){
      let questionList = {
        questions: question.value,
        survey_id: survey_iD,
      };
      console.log(questionList);
      $.ajax({
        url: uriQuestion,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(questionList),
        success: function (data) {
          swal({
            title: "DONE!",
            text: " Survey added successfuly",
            type: "success",
          }).then((okay) => {
            if (okay) {
              window.location.replace("./survey.html");
            }
          });
        },
        error: function (request, msg, error) {
          console.log("Can not post");
        },
      });
    }
  
  });
  
}
