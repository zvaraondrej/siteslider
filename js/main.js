var AppController = (function(){
  


  var _moveButton = $('#moveButton');
  var _scrW = $(window).width();
  var _scrH = $(window).height();
  var _page1 = $('#page1');
  var _page2 = $('#page2');
  var _page3 = $('#page3');
  var _page4 = $('#page4');
  var _currPos = 'pg1';
  var html = $('html, body');

  var h11 = $('#headingHolder :first-child');
  var h12 = $('#headingHolder :last-child');
  var section = $('#sidebar section');

  function init(){
    _setPageBgr(_page1, Data.s1.url);
    _setPageBgr(_page2, Data.s2.url);
    _setPageBgr(_page3, Data.s3.url);
    _setPageBgr(_page4, Data.s4.url);

  	setPagePosition(_page1, 0, 0);
  	setPagePosition(_page2, 0, _scrW);
    setPagePosition(_page3, _scrH, _scrW);
  	setPagePosition(_page4, _scrH, 0);
  	_assignEventHandlers();
    _changeSidebarContent(Data.s1.h.h1, Data.s1.h.h2, Data.s1.p)
  }

  function prt(arg){
  	return console.log(arg);
  }

  function setPagePosition(obj, t, l){
  	obj.css('top', t);
  	obj.css('left', l);
  }

  function _setPageBgr(page, url){
    var css = 'url(./img/berlin/' + url + ')';
  	page.css('background-image', css);
  }


  function _movePage(obj, x, y){
  	obj.animate({left: x, top: y}, 1000);
  }

  function _rotateElement(obj, dgrFrom, dgrTo){
    obj.rotate({
      duration: 1000,
      angle: dgrFrom, 
      animateTo: dgrTo,
      easing: $.easing.easeInOutElastic
    });
  }

  function _changeSidebarContent(newH1, newH2, p){
    h11.fadeOut(500, function() {
      $(this).text(newH1);
    }).fadeIn();

    h12.fadeOut(600, function() {
      $(this).text(newH2);
    }).fadeIn();

    section.fadeOut(700, function() {
      $(this).find('p').remove();

      for(var i in p){
        $(this).append(p[i]);
      }
    }).fadeIn();


  }


  function _assignEventHandlers(){
  	$(window).resize(function(){
  		_setSidebarDimensions();
  	});

  	$('#moveButton').click(function(){
      switch(_currPos){
        case 'pg1':
          _movePage(html, -_scrW, 0);
          _rotateElement(_moveButton, 0, 90);
           _currPos = 'pg2';
           _changeSidebarContent(Data.s2.h.h1, Data.s2.h.h2, Data.s2.p);
           Map.panMap(Data.s2.coords);
           break;
        case 'pg2':
          _movePage(html, -_scrW, -_scrH);
          _rotateElement(_moveButton, 90, 180);
            _currPos = 'pg3';
            _changeSidebarContent(Data.s3.h.h1, Data.s3.h.h2, Data.s3.p);
            Map.panMap(Data.s3.coords);
           break;
        case 'pg3':
          _movePage(html, 0, -_scrH);
          _rotateElement(_moveButton, 180, 270);
          _currPos = 'pg4';
          _changeSidebarContent(Data.s4.h.h1, Data.s4.h.h2, Data.s4.p);
          Map.panMap(Data.s4.coords);
          break;
        default:
          console.log("Some error is here!");
      }
    });

    $('#starter i').hover(function(){
      $(this).addClass('animated pulse');
    },function(){
        $(this).removeClass('animated');
        $(this).removeClass('pulse');
    });

     $('#starter i').click(function(e){
        $(this).removeClass('animated');
        $(this).removeClass('pulse');
        $(this).addClass('animated fadeOutUp');
        $('#starter i').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('#starter').remove();
        });
        e.preventDefault();
     });

  }

	return{
		init: init
	};
})();