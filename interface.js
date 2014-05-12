var blessed = require('blessed');

var Interface = {};

Interface.init = function(apps, main_screen) {
  // Create a screen object.
  Interface.screen = blessed.screen({
    autoPadding: true,
    fastCSR: true
  });

  // Quit on Escape, q, or Control-C.
  Interface.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  //Interface.render = Interface.screen.render;

  var box_number = Object.keys(apps).length;
  var box_height = 100 / box_number;
  var offset = 0;

  Object.keys(apps).forEach(function(app_key) {
    var app = apps[app_key];

    var ux = Interface.buildBox({
      top : offset,
      height : box_height,
      width : '80%',
      label : app_key
    });

    //ux.on('wheeldown', function() {
    //   console.log(arguments);
    // });

    apps[app_key].ux = ux;
    offset += box_height;

    Interface.screen.append(ux);
    Interface.screen.render();
  });


  main_screen.info_ux = Interface.buildBox({
    left : '80%',
    top : 0,
    height : '100',
    width : '20%',
    label : 'pm2 infos'
  });

  Interface.screen.append(main_screen.info_ux);
  Interface.screen.render();

};

Interface.buildBox = function(opts) {
  if (typeof opts === 'undefined') opts = {};

  var box = blessed.box({
    top: opts.top + "%",
    left: opts.left || '0%',
    width: opts.width || '100%',
    height: opts.height + "%",
    label : opts.label || 'Untitled',
    content: 'empty',
    scrollable : true,
    alwaysScroll : true,
    scrollbar: {
      ch: ' '
    },
    tags: true,
    border: {
      type: 'line'
    },
    style: {
       scrollbar: { bg: 'blue', inverse : true },
      border: {
        fg: '#f0f0f0'
      }
    }
  });

  return box;
};

module.exports = Interface;
