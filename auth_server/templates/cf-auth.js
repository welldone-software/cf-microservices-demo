function cfAuthOpen(appId, cb){
  var authServerBaseUrl = '__AUTH_BASE_URL__';
  var win = window.open(authServerBaseUrl + '/' + appId + '/login', 'auth' , 'width=500, height=300, menubar=no, topbar=no, status=no, resizable=no, location=no');

  window.addEventListener('message', function(event){
    var eventData = JSON.parse(event.data);
    if (eventData.success) {
      cb(null, eventData.jwt);
    } else {
      cb(new Error(eventData.message), null);
    }
  }, false);
}


