var net = require('net');
var file_path = "/Users/jwcooper/dev/apps/OccEditor/helpers/python/temp/test.py";
var debug_client = new net.Socket();
var HOST = '127.0.0.1',
    PORT = 5000,
    buffer = '';
debug_client.connect(PORT, HOST, function() {
  client_connected = true;
  console.log('connected to python debugger: ' + HOST + ':' + PORT);
  console.log(file_path);

  debug_client.write('DEBUG,' + file_path + '\n');
  debug_client.write('NEXT\n');
  debug_client.write('NEXT\n');
  debug_client.write('NEXT\n');
  debug_client.write('NEXT\n');

  //debug_client.write('NEXT\n');
  //debug_client.write('NEXT\n');
  //debug_client.write('NEXT\n');
  //debug_client.write('NEXT\n');
  //debug_client.write('NEXT\n');
  //debug_client.write('NEXT\n');
  //debug_client.write('NEXT\n');

  /*client.write('NEXT\n');
  client.write('LOCALS\n');
  client.write('NEXT\n');
  client.write('LOCALS\n');
  client.write('NEXT\n');
  client.write('LOCALS\n');
  client.write('NEXT\n');
  client.write('GLOBALS\n'); 
  client.write('NEXT\n');
  client.write('NEXT\n');
  client.write('NEXT\n');      
  client.write('QUIT\n');*/
  //client.write('DEBUG,/Users/jwcooper/dev/apps/OccEditor/helpers/python/temp/test.py\n');
  //client.write('NEXT\n');    
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
debug_client.on('data', function(data) {
    
  //console.log('DATA: ' + data);
  buffer += data.toString();
  if (buffer.indexOf('\n')) {
    var temp_buff = buffer.split('\n');
    for (var i=0; i<temp_buff.length-1; i++) {
      console.log("before write");
      console.log(temp_buff);
      console.log(temp_buff.length);
      console.log("before json");
      console.log(JSON.parse(temp_buff[i]));
      console.log("after write");
    }

    
    buffer = temp_buff.slice(temp_buff.length);
  }
    // Close the client socket completely
    //client.destroy();
});

debug_client.on('error', function(data) {
  console.log('ERROR: ' + data);
});

// Add a 'close' event handler for the client socket
debug_client.on('close', function() {
    console.log('Connection closed');
    client_connected = false;
    debug_client = null;
});