
(function(global){

  let utils = global.utils || {};

    function first(array)
    {
      for ( let i = 0 ; i < array.length ; ++i)
      {
          return array[i];
      }
    }

    function addChildrenToParent(parent, ...children) {
      children.forEach(child=> parent.appendChild(child));
    }

    utils.first = first;
    utils.addChildrenToParent = addChildrenToParent;
    global.utils = utils;
  }(window));
