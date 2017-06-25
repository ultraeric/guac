import {Component} from 'react';
import * as utils from './utils';

let bindMethodNames = ['onMouseDown', 'onMouseUp', 'onMouseEnter', 'onMouseLeave',
                       'onMouseClick', 'className'];

//Wrap your higher-ordered components with this
function HOC(WrappedComponent) {
  for (var methodNameID in bindMethodNames) {

    //Closure to keep ownMethod reference
    function composeFunction(methodName) {
      let ownMethod = WrappedComponent.prototype[methodName];
      return function() {
        ownMethod && ownMethod.call(this, ...arguments);
        this.props[methodName] && this.props[methodName](...arguments);
      };
    }

    let methodName = bindMethodNames[methodNameID];
    WrappedComponent.prototype[methodName] = composeFunction(methodName);
  }

  //Allows usage of this.bindAllMethods() in the constructor
  WrappedComponent.prototype.bindAllMethods = function() {
    utils.bindAllMethods(this);
  };
  //Allows usage of this.deleteUsedProps(propNames)
  WrappedComponent.prototype.deleteUsedProps = function(propNames) {
    return utils.deleteUsedProps(this.props, propNames);
  }

  return WrappedComponent;
}

export default HOC;
export {HOC};
