
var fs        = require('fs');
var path      = require('path');
var ipm2      = require('pm2-interface')();
var async     = require('async');
var Interface = require('./interface');
var util      = require('util');
var watch     = require('watch');

require('colors');

/**
 * This variable is an object containing all app being supervised
 */
var gl_data = {};

/**
 * This variable is about different part of the screen
 */
var main_screen = {
  info_ux : null,
  // Add messagee and refresh
  add_message : function(msg) {
    this.messages.unshift(msg);
    if (this.info_ux !== null) {
      this.info_ux.setContent(this.messages.slice(0, 100).join('\n'));
      Interface.screen.render();
    }
  },
  messages : []
};

/**
 * Listen to events from pm2
 */
function collect() {
  ipm2.bus.on('*', function(event, data){
    if (event == 'log:out' || event == 'log:err') {
      var type = (event == 'log:out') ? 'out'.blue : 'err'.red;
      var proc = gl_data[data.process.pm2_env.name];

      proc.logs.unshift(util.format('(%d)[%s] %s', proc.logs_index, type, data.data.trim()));
      proc.logs_index++;

      if (proc.ux) {
        proc.ux.setContent(proc.logs.slice(0, 100).join('\n'));
        Interface.screen.render();
      }
    }
    else {

    }
  });
}

/**
 * Create process list
 */
function build() {
  ipm2.rpc.getMonitorData({}, function(err, dt) {

    dt.forEach(function(proc) {
      gl_data[proc.name] = {
        log_out : [],
        log_err : [],
        logs : [],
        logs_index : 0,
        base_path : path.dirname(proc.pm2_env.pm_exec_path),
        name : proc.name,
        raw : proc
      };
    });

    Interface.init(gl_data, main_screen);
    collect();
  });
};

function init() {
  // Connected to pm2
  ipm2.on('ready', function() {
    console.log('Connected to pm2');

    build();

    // Clear all processes
    // ipm2.rpc.deleteAll({}, function() {

    //   var file = path.join(process.cwd(), process.argv[2]);
    //   var json = JSON.parse(fs.readFileSync(file));

    //   async.eachLimit(json, 1, function(proc, next) {
    //     // Only launch one instance vecause we are on development mode
    //     if (proc.instances)
    //       delete proc.instances;
    //     ipm2.rpc.prepareJson(proc, process.cwd(), next);
    //   }, build);
    // });
  });
};

init();
