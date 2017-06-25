import {Component} from 'react';

let bindMethodNames = ['onMouseDown', 'onMouseUp', 'onMouseEnter', 'onMouseLeave',
                       'onMouseClick', 'className'];

//Wrap your higher-ordered components with this
function HOC(WrappedComponent) {
  for (var methodName in bindMethodNames) {

    //Closure to keep ownMethod reference
    function composeFunction(methodName) {
      let ownMethod = WrappedComponent[methodName];
      return function(args) {
        ownMethod();
        this.props[methodName] ? this.props[methodName](...args) : null;
      };
    }

    WrappedComponent[methodName] = compoaseFunction(methodName);
  }
  return WrappedComponent;
}

export default HOC;
export {HOC};
