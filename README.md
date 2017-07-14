# GUAC-HOC
<h1>Overview</h1>
GUAC-HOC stands for General Usage Advanced Components (GUAC) - Higher Order Components (HOC).
This library exposes a variety of compositional methods and components for the React library that allow for better and
more consistent higher-order component and compositional behavior.

<h3>Example Use Case</h3>
Say I have two higher-order components that apply styles to a <code>WrappedComponent</code>. How should I format
the classes to properly and consistently combine the props that the higher-order components may modify? Ultimately,
I want simple composition of components as down below without having to manually alter and append to props in
each higher-order component.

```jsx
WrappedComponent = higherOrderComponent1(higherOrderComponent2(WrappedComponent));
...
<WrappedComponent className='myClassName'/>
```
    
An example implementation is below. Notice the problem with className. Imagine that, as an end user, I define a 
component, apply the higher order component, then want to pass in a `className` prop. This higher order component 
would intercept it! Note that this is an issue with every prop, including event props such as `onClick` and `onMouseDown`.
While it is possible to solve this with composition from the library manager's end, this can lead to ugly code and excessive
boilerplate.
    
```jsx
  function higherOrderComponent1(WrappedComponent) {  
    ...  
    return class WrapperComponent extends React.Component {  
      ...
      render() {
        return (
          /* className is intercepted and overridden, so some user-passed props 
          like className are not propagated to WrappedComponent*/
          <WrappedComponent {...this.props} className='styleClass1'/>
        );
      }
    }
  }
```
    
<h1>Installation</h1>
<p>Run the following to install:</p>

```
npm install --save guac-hoc@latest
```

<h1>Usage</h1>
<h3>Importing</h3>

```jsx
import HOC from 'guac-hoc/lib/HOC';
import Guac from 'guac-hoc/lib/Guac';
```

<h3>Exposed Methods</h3>

Method|Parameters|Returns|Description
---|---|---|---
`this.bindAllMethods()`|None|None|Use in constructor. Binds all class methods to the instance.
`this.deleteUsedProps(propNames)`|propNames: list\<string\>|props: object|Removes all props that you do not want exposed to your `WrappedComponent`.

<h3>Compositional Methods</h3>

These methods are special, reserved methods that each map to a prop. If your higher-order component intercepts or passes
down any of these props to the `WrappedComponent`, instead implement the corresponding method and pass it or its return value
down instead.

Method|Parameters|Returns|Description
---|---|---|---
`this.className()`|None|string|Define the calculation for your higher-order component's `className` here and return it. Call this in `render()` to get the composed `className` and pass that value down.
`this.onClick(event)`|event|None|Define onClick prop. Pass prop as a method reference as usual.
`this.onMouseDown(event)`|event|None|Define onMouseDown prop. Pass prop as a method reference as usual.
`this.onMouseUp(event)`|event|None|Define onMouseUp prop. Pass prop as a method reference as usual.
`this.onMouseEnter(event)`|event|None|Define onMouseEnter prop. Pass prop as a method reference as usual.
`this.onMouseLeave(event)`|event|None|Define onMouseLeave prop. Pass prop as a method reference as usual.
