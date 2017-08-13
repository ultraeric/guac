import * as React from 'react';

//Quickly bind all methods
function bindAllMethods(obj) {
  let protoObj = Object.getPrototypeOf(obj);
  let bindMethodNames = Object.getOwnPropertyNames(protoObj);
  for (var methodNameID in bindMethodNames) {
    let methodName = bindMethodNames[methodNameID];
    if (typeof protoObj[methodName] === 'function' && methodName !== 'constructor') {
      obj[methodName] = protoObj[methodName].bind(obj);
    }
  }
}

//Non-mutating
function deleteUsedProps(props, propNames) {
  let updatedProps = Object.assign({}, props);
  for (var propNameID in propNames) {
    delete updatedProps[propNames[propNameID]];
  }
  return updatedProps;
}

let exports = {bindAllMethods, deleteUsedProps};

export default exports;
export {bindAllMethods, deleteUsedProps};
