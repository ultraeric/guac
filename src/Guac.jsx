import * as utils from './utils';
let bindMethodNames = ['onMouseDown', 'onMouseUp', 'onMouseEnter', 'onMouseLeave',
                       'onClick'];

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
    function composeFunction(methodName) {
      let ownMethod = WrappedComponent.prototype[methodName];
      return function() {
        ownMethod && ownMethod.call(this, ...arguments);
        let proxyEvent = arguments[0];
        console.log('testin');
        if (proxyEvent && (!proxyEvent.isPropagationStopped || !proxyEvent.isPropagationStopped())) {
          console.log('propsmethod called');
          this.props[methodName] && this.props[methodName](...arguments);
        }

      };
    }

    let methodName = bindMethodNames[methodNameID];
    WrappedComponent.prototype[methodName] = composeFunction(methodName);
  }

  WrappedComponent.prototype.className = (function() {
    let ownMethod = WrappedComponent.prototype.className;
    return function() {
      let ownClassName = ownMethod ? ownMethod.call(this, ...arguments) : '';
      let propsClassName = this.props.className || '';
      return ownClassName + ' ' + propsClassName;
    }
  })();

  WrappedComponent.prototype.style = (function() {
    let ownMethod = WrappedComponent.prototype.style;
    return function() {
      let ownStyle = ownMethod ? ownMethod.call(this, ...arguments) : {};
      let propsStyle = this.props.style || {};
      return Object.assign({}, ownStyle, propsStyle);
    }
  })();

  //Allows usage of this.bindAllMethods() in the constructor
  WrappedComponent.prototype.bindAllMethods = function() {
    utils.bindAllMethods(this);
  };
  //Allows usage of this.deleteUsedProps(propNames)
  WrappedComponent.prototype.deleteUsedProps = function(propNames) {
    return utils.deleteUsedProps(this.props, propNames);
  }

  WrappedComponent.isGuacComponent = true;

  return WrappedComponent;
}

export default Guac;
export {Guac};
