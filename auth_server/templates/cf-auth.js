function cfAuthOpen(appId, cb){
  var authServerBaseUrl = '__AUTH_BASE_URL__';
  var width = 300;
  var height = 379;
  var top = (screen.height - height) / 2;
  var left = (screen.width - width) / 2;
  var features = 'menubar=0,location=1,resizable=1,scrollbars=0,status=0,toolbar=0,width='+width+',height='+height+',left='+left+',top='+top;
  var url = authServerBaseUrl + '/' + appId + '/login';
  var win = window.open(url, 'oauth', features);

  window.addEventListener('message', function(event){
    var eventData = typeof event.data === 'string'
      ? JSON.parse(event.data)
      : event.data;

    if (eventData.source) return;

    if (eventData.success) {
      cb(null, eventData.jwt);
    } else {
      cb(new Error(eventData.message), null);
    }
  }, false);
}


