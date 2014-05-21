var fs = require('fs');
function inject(script, data) {
	if (data) {
    	script = script.replace('%data%', JSON.stringify(data));
    }
    return script;
}

module.exports = function(ptor, module, scriptin, data) {
	var script = inject((typeof scriptin == 'string' ? (fs.existsSync(scriptin) ? fs.readFileSync(scriptin).toString() : scriptin) : scriptin), data);
	ptor.addMockModule(module, script);
};