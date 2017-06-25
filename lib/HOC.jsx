import {Component} from 'react';

let bindMethodNames = ['onMouseDown', 'onMouseUp', 'onMouseEnter', 'onMouseLeave',
                       'onMouseClick', 'className']

class HOC extends Component {
  constructor(props) {
    super(props);
    let bindMethodNames = Object.getOwnPropertyNames(this.prototype);
    for (var methodName in bindMethodNames) {
      if (typeof methodName == 'function') {
        this[methodName] = this[methodName].bind(this);
      }
    }
  }
}

for (var methodName in bindMethodNames) {
  HOC[methodName] = function(args) {
    this.props[methodName] ? this.props[methodName](...args) : null;
  }
}

export default HOC;
export {HOC};
