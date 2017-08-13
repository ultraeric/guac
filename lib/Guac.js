'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Guac = undefined;

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var bindMethodNames = ['onMouseDown', 'onMouseUp', 'onMouseEnter', 'onMouseLeave', 'onClick'];

/*
NOTE: ONLY USE THIS IS YOU PLAN ON UTILIZING COMPOSITION TO COMBINE METHODS.
THIS IS OFTEN DONE TO APPLY STYLES IN OPTIONAL LAYERS OR ADD CUSTOMIZABLE LAYERS
OF FUNCTIONALITY TO COMPONENTS.

USAGE:
- All Guac components, when providing custom functionality for any of the above
    method names, should implement the methods and provide any extra functionality
    they are providing in those methods. The composition will automatically be
    handled.

- A Guac component's render() method should pass all props it is provided first,
    then override any methods as needed.

Guac provides a number of utility functions. Call it on a component to transform it.

- All method names in bindMethodNames are names of special functions. They are
    added to the WrappedComponent, and when invoked, will attempt to call both
    the method defined within WrappedComponent and the same method passed to it
    as a prop. This allows higher-order components to compose together layers
    of special functions without layering extra divs and spans.

    Ex: if a user passes into a higher-order component a function called onClick
    and your higher-order component has its own onClick, you can solve this by
    either wrapping the wrapped component in another element to handle the onClick,
    or composing together your function and the passed function. The first option
    is simpler but uses more DOM nodes and can have weird rendering issues. The
    second option is much more intuitive from a user's perspective.

- A special method, this.className() has been exposed. Define this method to
    return your own class name(s). Guac will handle the composition.

- Two utility methods, this.bindAllMethods() and this.deleteUsedProps(propNames)
    have been exposed. this.bindAllMethods will bind all the methods to the class
    instance during instantiation (put it in the constructor). this.deleteUsedProps
    should be used during render to delete props that are not going to be used.
    Returns a shallow-copied object with the specified keys deleted.
*/
function Guac(WrappedComponent) {
  for (var methodNameID in bindMethodNames) {

    //Closure to keep ownMethod reference
    var composeFunction = function composeFunction(methodName) {
      var ownMethod = WrappedComponent.prototype[methodName];
      return function () {
        ownMethod && ownMethod.call.apply(ownMethod, [this].concat(Array.prototype.slice.call(arguments)));
        if (event && !event.isPropagationStopped() || !event) {
          var _props;

          this.props[methodName] && (_props = this.props)[methodName].apply(_props, arguments);
        }
      };
    };

    var methodName = bindMethodNames[methodNameID];
    WrappedComponent.prototype[methodName] = composeFunction(methodName);
  }

  WrappedComponent.prototype.className = function () {
    var ownMethod = WrappedComponent.prototype.className;
    return function () {
      var ownClassName = ownMethod ? ownMethod.call.apply(ownMethod, [this].concat(Array.prototype.slice.call(arguments))) : '';
      var propsClassName = this.props.className || '';
      return ownClassName + ' ' + propsClassName;
    };
  }();

  WrappedComponent.prototype.style = function () {
    var ownMethod = WrappedComponent.prototype.style;
    return function () {
      var ownStyle = ownMethod ? ownMethod.call.apply(ownMethod, [this].concat(Array.prototype.slice.call(arguments))) : {};
      var propsStyle = this.props.style || {};
      return Object.assign({}, ownStyle, propsStyle);
    };
  }();

  //Allows usage of this.bindAllMethods() in the constructor
  WrappedComponent.prototype.bindAllMethods = function () {
    utils.bindAllMethods(this);
  };
  //Allows usage of this.deleteUsedProps(propNames)
  WrappedComponent.prototype.deleteUsedProps = function (propNames) {
    return utils.deleteUsedProps(this.props, propNames);
  };

  WrappedComponent.isGuacComponent = true;

  return WrappedComponent;
}

exports.default = Guac;
exports.Guac = Guac;