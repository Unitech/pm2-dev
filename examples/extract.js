
screen.on('prerender', function() {
  screen._.bar.setContent(Array(screen.width + 1).join(' '));
});

screen._.sep = blessed.line({
  parent: screen._.wrapper,
  top: 1,
  left: 0,
  right: 0,
  orientation: 'horizontal'
});

var tabs = screen._.tabs = {};
['overview',
 'send',
 'receive',
 'transactions',
 'addresses',
 'misc',
 'logs',
 'debug'].forEach(function(name) {
   var tab = tabs[name] = blessed.box({
     top: 2,
     left: 0,
     right: 0,
     bottom: 0,
     scrollable: true,
     keys: true,
     vi: true,
     alwaysScroll: true,
     scrollbar: {
       ch: ' '
     },
     style: {
       scrollbar: {
         inverse: true
       }
     }
   });

   screen._.bar.addItem({
     text: name,
     callback: function() {
       if (screen._.target) screen._.target.detach();
       screen._.wrapper.append(tab);
       tab.focus();
       screen._.target = tab;
       screen.render();
     }
   });
 });

tabs.overview._.wallet = blessed.text({
  parent: tabs.overview,
  top: 0,
  left: 3,
  height: 'shrink',
  width: '40%',
  label: ' {blue-fg}Wallet{/blue-fg} ',
  tags: true,
  border: {
    type: 'line'
  },
  content: 'No balance.',
  tags: true
});

tabs.overview._.transactions = blessed.text({
  parent: tabs.overview,
  top: 0,
  right: 3,
  height: 'shrink',
  width: '40%',
  label: ' {blue-fg}Transactions{/blue-fg} ',
  tags: true,
  border: {
    type: 'line'
  },
  content: 'No transactions.',
  tags: true
});

tabs.overview._.data = blessed.box({
  parent: tabs.overview,
  bottom: 0,
  left: 3,
  // XXX Fix in blessed: - probably has something to do with bottom: 0
  // height: 'shrink',
  height: 6,
  width: '40%',
  label: ' {blue-fg}Data{/blue-fg} ',
  tags: true,
  border: 'line',
  content: 'Loading... ',
  style: {
    fg: 'lightblack',
    bar: {
      bg: 'blue'
    }
  }
});

tabs.overview._.bar = blessed.progressbar({
  parent: tabs.overview._.data,
  top: 3,
  left: 0,
  right: 0,
  height: 'shrink',
  orientation: 'horizontal',
  filled: 0,
  ch: '|',
  tags: true,
  //content: 'Syncing... ',
  style: {
    fg: 'lightblack',
    bar: {
      bg: 'blue'
    }
  }
});
tabs.send.on('focus', function() {
  tabs.send._.form.focus();
});

tabs.send._.form = blessed.form({
  parent: tabs.send,
  top: 0,
  left: 1,
  right: 1,
  //height: 9,
  // Fixed in blessed:
  height: 'shrink',
  keys: true,
  mouse: true,
  label: ' {blue-fg}Send{/blue-fg} ',
  border: 'line',
  tags: true,
  autoNext: true
});

tabs.send._.ttext = blessed.text({
  parent: tabs.send._.form,
  top: 0,
  left: 0,
  height: 1,
  content: 'Pay {underline}T{/underline}o:',
  tags: true
});

tabs.send._.address = blessed.textbox({
  parent: tabs.send._.form,
  name: 'address',
  inputOnFocus: true,
  top: 0,
  left: 9,
  right: 1,
  height: 1,
  style: {
    bg: 'black',
    focus: {
      bg: 'blue'
    },
    hover: {
      bg: 'blue'
    }
  }
});

tabs.send._.ltext = blessed.text({
  parent: tabs.send._.form,
  top: 2,
  left: 0,
  height: 1,
  content: ' {underline}L{/underline}abel:',
  tags: true
});

tabs.send._.label = blessed.textbox({
  parent: tabs.send._.form,
  name: 'label',
  inputOnFocus: true,
  top: 2,
  left: 9,
  right: 1,
  height: 1,
  style: {
    bg: 'black',
    focus: {
      bg: 'blue'
    },
    hover: {
      bg: 'blue'
    }
  }
});

tabs.send._.mtext = blessed.text({
  parent: tabs.send._.form,
  top: 4,
  left: 0,
  height: 1,
  content: 'A{underline}m{/underline}ount:',
  tags: true
});

tabs.send._.amount = blessed.textbox({
  parent: tabs.send._.form,
  name: 'amount',
  inputOnFocus: true,
  top: 4,
  left: 9,
  right: 1,
  height: 1,
  style: {
    bg: 'black',
    focus: {
      bg: 'blue'
    },
    hover: {
      bg: 'blue'
    }
  }
});
