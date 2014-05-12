


// Append our box to the screen.
var b1 = buildBox({
  top : "0%",
  width : "100%",
  height : "20%",
  label : 'toto'
});

screen.append(b1);

var logs = [];
var i = 0;

setInterval(function() {
  logs.unshift(' hey asd werfwetwe twetwetewt ' + i++);
  b1.setContent(logs.slice(0, 30).join('\n'));
  screen.render();
}, 100);

screen.append(buildBox({
  top : "20%",
  label : 'toto',
  height : "20%",
  width : "100%"
}));
