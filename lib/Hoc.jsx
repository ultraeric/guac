import Guac from './Guac';


//Wrap your higher-ordered components with this.
function Hoc(WrappedComponent) {
  return Guac(WrappedComponent);
}

export default Hoc;
export {Hoc};
