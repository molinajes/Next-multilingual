var ejs = require('ejs');
var fs = require('fs');

var content = '<%- include ./js/partials/beta_index %>';

var initialSlug = 'initial';
var initialContent = require('./js/content/beta/' + initialSlug + '.js').content;
var initial = ejs.render(content, initialContent, {filename: './'});




fs.writeFile('output/beta/index.html', initial);

