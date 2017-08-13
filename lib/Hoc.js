'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hoc = undefined;

var _Guac = require('./Guac');

var _Guac2 = _interopRequireDefault(_Guac);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Wrap your higher-ordered components with this.
function Hoc(WrappedComponent) {
  return (0, _Guac2.default)(WrappedComponent);
}

exports.default = Hoc;
exports.Hoc = Hoc;