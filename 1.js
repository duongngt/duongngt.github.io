 $(function(){
          $('.button,.ab').click(function() {
          	$('body,html').animate({scrollTop:$('#boxabout').offset().top},500);
          	return false;
          });
          $('.sk').click(function() {
          	$('body,html').animate({scrollTop:$('#boxskills').offset().top},700);
          	return false;
          });
          $('.exe').click(function() {
          	$('body,html').animate({scrollTop:$('#boxexpedu').offset().top},900);
          	return false;
          });
          $('.bl').click(function() {
          	$('body,html').animate({scrollTop:$('#boxblog').offset().top},1000);
          	return false;
          });
          $('.ct').click(function() {
          	$('body,html').animate({scrollTop:$('#boxcontact').offset().top},1000);
          	return false;
          });
          $('.bnthome').click(function() {
          	$('body,html').animate({scrollTop:0},700);
          	return false;
          });
})  ;
 