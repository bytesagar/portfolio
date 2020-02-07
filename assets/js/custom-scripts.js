

  /*
      |====================
      | Mobile NAv trigger
      |=====================
      */
      
     var trigger = $('.navbar-toggler'),
     overlay     = $('.overlay'),
     navc     = $('.navbar-collapse'),
     active      = false;
 

     $('.navbar-toggler, .navbar-nav li a, .overlay').on('click', function () {
         $('.navbar-toggler').toggleClass('active')
       /  $('#js-navbar-menu').toggleClass('active');
          $('.navbar-collapse').toggleClass('show');
         overlay.toggleClass('active');
         navc.toggleClass('active');
     });  
     


  /*
      | ==========================
      | NAV FIXED ON SCROLL
      | ==========================
      */
     $(window).on('scroll', function() {
      var scroll = $(window).scrollTop();
      if (scroll >= 50) {
          $(".nav-scroll").addClass("nav-strict");
      } else {
          $(".nav-scroll").removeClass("nav-strict");
      }
  });
  
  
     // Wow js

     $(function(){
      new WOW().init(); 
    });
    
      // Smooth Scroll
      $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top
              }, 600);
              return false;
            }
          }
        });
      });
   /*
      |=================
      | CONTACT FORM
      |=================
      */
  $("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      formError();
      submitMSG(false, "Did you fill in the form properly?");
    } else {
      // everything looks good!
      event.preventDefault();
      submitForm();
    }
 });

  function submitForm(){
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    $.ajax({
        type: "POST",
        url: "process.php",
        data: "name=" + name + "&email=" + email + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
              } else {
                formError();
                submitMSG(false,text);
              }
          }
      });
  }
  function formSuccess(){
      $("#contactForm")[0].reset();
      submitMSG(true, "Message Sent!")
  }
    function formError(){   
      $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass();
      });
    }
  function submitMSG(valid, msg){
    if(valid){
      var msgClasses = "h3 text-center fadeInUp animated text-success";
    } else {
      var msgClasses = "h3 text-center shake animated text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }
