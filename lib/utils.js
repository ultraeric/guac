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

export default bindAllMethods;
export {bindAllMethods};
