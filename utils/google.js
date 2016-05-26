var config = require('./config.js');

(function() {
  var GOOGLE_MAP_KEY = config.GOOGLE_MAP_KEY; 
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3' +
      'key=' + GOOGLE_MAP_KEY;
  document.body.appendChild(script);
})();
