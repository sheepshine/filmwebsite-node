var bunyan= require('bunyan');
var log=bunyan.createLogger({
	name:'myapp',streams: [
	    {
	      level: 'info',
	      path: 'myapp-info.log',            // log INFO and above to stdout
	      period: '1d'
	    },
	    {
	      level: 'error',
	      path: 'myapp-error.log',  // log ERROR and above to a file
	      period: '1d'
	    }
  	]
  });

module.exports=log;