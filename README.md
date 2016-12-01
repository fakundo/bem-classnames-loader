#bem-classnames-loader for webpack

[![npm](https://img.shields.io/npm/v/bem-classnames-loader.svg?maxAge=2592000)](https://www.npmjs.com/package/bem-classnames-loader)

This loader extracts modifiers and states defined in your css files and then provide an interface for generating class names. So you get a something similar with css-modules but with BEM.

##Installation
```
npm install bem-classnames-loader --save-dev
```

##Examples

button.scss
```scss
.button {
  color: white;
  cursor: pointer;

  &__inner {
    font-size: 16px;
  }

  &--borderless {
    border: none;
  }

  &--type-default {
    background-color: gray;
  }

  &--type-success {
    background-color: green;
  }

  &.is-disabled {
    opacity: .5;
    cursor: default;
  }
}
```

button.js
```js
import style from './button.scss';

style('button') // button
style('button', { disabled: true }) // button is-disabled
style('button', { borderless: true }) // button button--borderless
style('button', { disabled: true, type: 'success' }) // button is-disabled button--type-success
style('button', { disabled: true }, 'form__button') // button is-disabled form__button
style('button', { disabled: true }, { type: 'default' }, 'form__button') // button is-disabled button--type-default form__button

style('&') // button
style('&inner') // button__inner
style('button__inner') // button__inner
```

webpack.config.js
```js
...
// Optional parameters (you can pass them with loader query too)
bemClassnames: {
  prefixes: {
    state: 'is-'
  }
},
module: {
  loaders: [
    {
      test: /\.scss$/,
      loader: 'bem-classnames!style!css!sass'

      // If you using extract-text-plugin
      // loaders: ['bem-classnames', ExtractTextPlugin.extract('css!sass')]
    }
  ]
}
...
```

##React component example
This example shows how easy you can use props to generate class names. 

```js
import React, { Component } from 'react';
import style from './button.scss';

export default class Button extends Component {
    
  static propTypes = {
    disabled: React.PropTypes.bool,
    borderless: React.PropTypes.bool,
    type: React.PropTypes.oneOf([ 'success', 'default' ]);
  };

  static defaultProps = {
    type: 'default'
  };

  render() {
    return (
      <button className={style('&', this.props)}>
        <div className={style('&inner')}>
          Click me
        </div>
      </button>
    );
  }
  
};
```

Now render `Button` with different props:

```js
<Button /> //button button--type-default
<Button borderless /> //button button--borderless
<Button type="success" /> //button button--type-success
<Button type="success" disabled /> //button button--type-success is-disabled
```

<a name="loader-options"></a>
##Loader options

```js
{
  prefixes: {
    element: '__',
    modifier: '--',
    state: 'is-',
    modifierValue: '-',
    stateValue: '-'
  },
  applyClassPrefix: ''
}
```

- `prefixes` - define bem entity prefixes
- `applyClassPrefix` - prefix will be added to class names. For example, you use `postcss-loader` and it's `postcss-class-prefix` plugin to add prefixes in your css. So you should use `applyClassPrefix` to add prefixes on Javascript side.

##API 
```js
import style from './button.scss';
```
##`style` 
Itself is a function, which generates class names in cool way.

##`style.ns` 
Get/set namespace. Sometimes class name is very large, namespaces help you to write lesser code.

Example:
```js
style('&') // button
style('&inner') // button__inner

// Set new namespace if you need
style.ns('super-good-component');

style('&') // super-good-component
style('&placeholder') // super-good-component__placeholder
```

##`style.modifier`
Adds new modifier.

Example: 
```js
// Add boolean modifier
style.modifier('button', 'fade');
style('button', { fade: true }) // button button--fade

// Add string modifier
style.modifier('button', 'size', ['sm', 'lg']);
style('button', { size: 'sm' }) // button button--size-sm
```

##`style.state`
Adds new state.

Example: 
```js
// Add boolean state
style.state('button', 'active');
style('button', { active: true }) // button is-active

// Add string state
style.state('button', 'foo', ['bar']);
style('button', { foo: 'bar' }) // button is-foo-bar
```

##`style.getClasses` 
Returns defined classes.
