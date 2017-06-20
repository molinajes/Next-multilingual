var ejs = require('ejs');
var fs = require('fs');

var content = '<%- include ./js/partials/index %>';

var webdevSlug = 'webdev';
var webdevContent = require('./js/content/' + webdevSlug + '.js').content;
var webdev = ejs.render(content, webdevContent, {filename: './'});

var busAnalystSlug = 'business-analyst-tool';
var businessAnalystContent = require('./js/content/' + busAnalystSlug + '.js').content;
var busAnalyst = ejs.render(content, businessAnalystContent, {filename: './'});

var reqAnalysisSlug = 'requirements-analysis';
var reqAnalysisContent = require('./js/content/' + reqAnalysisSlug + '.js').content;
var reqAnalysis = ejs.render(content, reqAnalysisContent, {filename: './'});

var useCaseToolSlug = 'use-case-tool';
var useCaseToolContent = require('./js/content/' + useCaseToolSlug + '.js').content;
var useCaseTool = ejs.render(content, useCaseToolContent, {filename: './'});


fs.writeFile('output/index.html', webdev);
fs.writeFile('output/' + busAnalystSlug + '.html', busAnalyst);
fs.writeFile('output/' + reqAnalysisSlug + '.html', reqAnalysis);
fs.writeFile('output/' + useCaseToolSlug + '.html', useCaseTool);

