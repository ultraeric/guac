import {Component} from 'react';
import * as utils from './utils';

let bindMethodNames = ['onMouseDown', 'onMouseUp', 'onMouseEnter', 'onMouseLeave',
                       'onMouseClick', 'className'];

//Wrap your higher-ordered components with this
function HOC(WrappedComponent) {
  for (var methodName in bindMethodNames) {

    //Closure to keep ownMethod reference
    function composeFunction(methodName) {
      let ownMethod = WrappedComponent[methodName];
      return function(args) {
        ownMethod && ownMethod();
        this.props[methodName] && this.props[methodName](...args);
      };
    }

    WrappedComponent[methodName] = composeFunction(methodName);
  }

  //Allows usage of this.bindAllMethods() in the constructor
  WrappedComponent.bindAllMethods = () => utils.bindAllMethods(this);
  //Allows usage of this.deleteUsedProps(propNames)
  WrappedComponent.deleteUsedProps =
    (propNames) => return utils.deleteUsedProps(this, propNames);
    
  return WrappedComponent;
}

export default HOC;
export {HOC};
