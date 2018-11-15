const http = require('http');
const querystring = require('querystring');
let {
	PythonShell
} = require('python-shell')
const server = http.createServer().listen(3000);
console.log("Server running");

// default python shell options
PythonShell.defaultOptions = {
	scriptPath: 'textgenrnn-master'
};

server.on('request', function (req, res) {
	if (req.method == 'GET') { //PUT Only

		// unser erstes Wort
		var seed = req.url.split('=')[1];
		seed = decodeURI(seed);
		var result;
		// python script ausführen
		PythonShell.run('node.py', {
			args: [seed]
		}, function (err, results) {
			if (err) throw err;
			const data = results[0];
			console.log("Input seed: " + seed);
			console.log("Output: " + data);
			res.writeHead(200, {
				'Content-Type': 'application/json'
			})
			res.write(JSON.stringify(data));
			res.end();
		});
	} else {
		res.end();
	}
});