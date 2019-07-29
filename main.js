$(document).ready(function() {

jQuery('#search_input').keyup(function(e) {

  if(e.keyCode == 32){
    
    console.log("sds");

    var dInput = this.value.replace(/\s+$/, '');
    $('#resultappend').empty();
 

    jQuery.ajax({
      url: "https://graph.facebook.com/v3.3/101803417830557?fields=posts%2Cvisitor_posts&access_token=EAAF2FJJTOroBAHY8G7n0MqOzaVn3aZC1xk4lxUjZCKp2Ph49aZAFZCqKn1ZAyHJENL7F4uvssBllmm11ZBznqVxj5aJK8RhxUAkeyZAY9c5kiS6kPTjZAC0xchnH18MilQBItqZCVVF82ZCRn4x1ZCfrZAxff6KVew1akZAcTy8xhrMZAloQZDZD",
      type: "GET",
      contentType: 'application/json; charset=utf-8',
      
      success: function(resultData) {
                   
      var appenddata = "";
      var allDatafromFB = {};
      
      for(var i=0; i < resultData.posts.data.length; i++){
                  
        if(resultData.posts.data.length > 0){
                      
          if(typeof resultData.posts.data[i].message != 'undefined'){
            allDatafromFB[resultData.posts.data[i].id] = resultData.posts.data[i].message;
          }
         }
        }

        for(var i=0; i < resultData.visitor_posts.data.length; i++){
               
          if(resultData.visitor_posts.data.length > 0){
                          
             if(typeof resultData.visitor_posts.data[i].message != 'undefined'){
                
              allDatafromFB[resultData.visitor_posts.data[i].id] = resultData.visitor_posts.data[i].message;
            }
          }
        }

        console.log(allDatafromFB);
                      
        Object.keys(allDatafromFB).forEach(function(key) {
            
          console.log(allDatafromFB[key] +"---"+ key);
          
          if (allDatafromFB[key].toLowerCase().includes(dInput)) {
                          
            appenddata += '<a href="http://facebook.com/'+key+'" target="_blank"><li class="list-group-item"><i class="fa fa-facebook-f"></i> '+ allDatafromFB[key] +'</li></a>';
          }
        });
        
        if(appenddata == ""){
            
          appenddata += '<li class="list-group-item">Topic not found <a href="https://www.facebook.com/Study-101803417830557/" target="_blank"><button class="btn btn-default">Submit new topic?</button></a></li>';
        }
                
        jQuery("#resultappend").append(appenddata);
      },
              
      error : function(jqXHR, textStatus, errorThrown) {
      },

      timeout: 120000,
      
    });
}
});
});
