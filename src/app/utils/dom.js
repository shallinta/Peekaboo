const $ = {
  closest: (node, selector) => {
    if (selector.length <= 0 || !node) {
      return null;
    }
    let type = '';
    switch (selector[0]) {
      case '.':
        type = 'className';
        selector = selector.substring(1, selector.length);
        break;
      case '#':
        type = 'id';
        selector = selector.substring(1, selector.length);
        break;
      default:
        type = 'tagName';
        selector = selector.toUpperCase();
    }
    while (node) {
      if (node[type]) {
        const reg = new RegExp(`(\\s|^)${selector}(\\s|$)`);
        if (node[type].match(reg)) {
          break;
        }
      }
      node = node.parentNode;
    }
    return node;
  },
  hasClass: (node, cn) => node && node.className && node.className.match(new RegExp(`(\\s|^)${cn}(\\s|$)`)),
  addClass: (node, cn) => {
    if (!$.hasClass(node, cn)) {
      node.className += ` ${cn}`;
    }
  },
  removeClass: (node, cn) => {
    if ($.hasClass(node, cn)) {
      node.className = node.className.replace(new RegExp(`(\\s|^)${cn}(\\s|$)`), '');
    }
  }
};

export default $;
