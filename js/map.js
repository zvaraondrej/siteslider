var Map = (function(){
  
  var _map;
  var _markers = {};
  var _zoom = L.control.zoom({});

  function init(){
  	_addMap();
  	_setMarkers();
  	_addMapEventListeners();
  }

  function prt(arg){
  	return console.log(arg);
  }

  function _addMap(){
    var opts = {
      zoom: 14,
      zoomControl: false,
      minZoom: 12,
      fullscreenControl: true,
  		fullscreenControlOptions: {
   			position: 'topleft'
  		},
  		forcePseudoFullscreen: true
    };
    _map = new L.Map('map', opts);

    var base = new L.TileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(_map); 
    _map.setView([52.534199, 13.3889], 16);
  }

  function _setMarkers(){
  	for(var i in Data){
  		var icon = L.AwesomeMarkers.icon({
   	 		markerColor: 'darkpuple',
    		iconColor: 'white',
    		icon: 'camera'
  		});
  		_markers[i] = new L.marker([Data[i].coords.lat, Data[i].coords.lng], {icon: icon}).addTo(_map);
  	}
  }

	function panMap(coords){
		panOpt = {
			animate: true,
			duration: 3,
			easeLinearity: 0.5
		};
		_map.panTo([coords.lat, coords.lng], panOpt);
  }

  function _addMapEventListeners(){
  	_map.on('enterFullscreen', function(){
  		_zoom.addTo(_map);
		});

		_map.on('exitFullscreen', function(){
			_zoom.removeFrom(_map);
		});
  }


  return{
  	init: init,
  	panMap: panMap
  };
})();