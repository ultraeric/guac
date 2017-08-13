'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUsedProps = exports.bindAllMethods = undefined;

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//Quickly bind all methods
function bindAllMethods(obj) {
  var protoObj = Object.getPrototypeOf(obj);
  var bindMethodNames = Object.getOwnPropertyNames(protoObj);
  for (var methodNameID in bindMethodNames) {
    var methodName = bindMethodNames[methodNameID];
    if (typeof protoObj[methodName] === 'function' && methodName !== 'constructor') {
      obj[methodName] = protoObj[methodName].bind(obj);
    }
  }
}

//Non-mutating
function deleteUsedProps(props, propNames) {
  var updatedProps = Object.assign({}, props);
  for (var propNameID in propNames) {
    delete updatedProps[propNames[propNameID]];
  }
  return updatedProps;
}

var _exports = { bindAllMethods: bindAllMethods, deleteUsedProps: deleteUsedProps };

exports.default = _exports;
exports.bindAllMethods = bindAllMethods;
exports.deleteUsedProps = deleteUsedProps;