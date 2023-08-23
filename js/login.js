const logURL = "http://localhost:2000/api/admin/login"
local = window.localStorage




// A $( document ).ready() block.
$( document ).ready(function() {
    console.log("login Ready");

  
    $("#btlog").on('click',function(){
      let user = ($("#user").val()).trim()
      let pass = ($("#pass").val()).trim()
      $.ajax({  
        url: `${logURL}/${user}/${pass}`,  
        type: 'get',  
        dataType: 'json', 
        success: function (data ) { 
            
          if (data.status == 300) {
            console.log("error");
          }else{
            window.location.replace("./index.html");
          }
              
          
        },
        error: function(request , msg , error){
          console.log(error);
        }
      })

    })
});