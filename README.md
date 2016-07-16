#bem-classnames-loader for webpack

[![npm](https://img.shields.io/npm/v/bem-classnames-loader.svg?maxAge=1592000)](https://www.npmjs.com/package/bem-classnames-loader)

This loader extracts modifiers and states defined in your css files and then provide an interface for generating class names. So you get hybrid of css-modules and BEM.

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
  background-color: #FF373A;

  &__inner {
    font-size: 16px;
  }

  &--success {
    background-color: #34CB12;
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
style('&__inner') // button__inner
style('button__inner') // button__inner
style('button', { disabled: true }) // button is-disabled
style('button', { disabled: true, success: true }) // button button--success is-disabled
style('button', { disabled: true }, 'form__button') // button is-disabled form__button
style('button', { disabled: true }, { success: true }, 'form__button') // button button--success is-disabled form__button
```

webpack.config.js
```js
...
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

      // If you use extract-text-plugin
      // loaders: ['bem-classnames', ExtractTextPlugin.extract('css!sass')]
    }
  ]
}
...
```

##Loader options

```js
{
  prefixes: {
    element: '__',  
    modifier: '--',
    state: 'is-'
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
Itself is a function, which generates class names in cool way. It's based on [bem-classnames](https://github.com/pocotan001/bem-classnames).

##`style.ns` 
Sets namespace. Sometimes block name is very large, namespaces help you to write lesser code.

Example:
```js
style('&') // button
style('&__inner') // button__inner

// Set namespace
style.ns('input');

style('&__placeholder') // input__placeholder
```

##`style.modifier`
Adds new modifier. Unfortunately loader can extract modifiers from css as booleans only. But often you need to set modifier as string. This method provides you this option.

Example: 
```js
// Add modifier
style.modifier('button', 'type');

style('button', { type: 'success' }) // button button--success
style('button', { type: 'success', disabled: true }) // button button--success is-disabled
```

React component example:
```js
import React, { Component } from 'react';
import style from './button.scss';

// Add modifier
style.modifier('button', 'type');

export default class Button extends Component {
    
  static propTypes = {
    disabled: React.PropTypes.bool,
    type: React.PropTypes.oneOf([ 'success', 'default' ]);
  };

  static defaultProps = {
    type: 'default'
  };

  render() {
    return (
      <button className={style('button', this.props)}>
        <div className={style('&__inner')}>
          Click me
        </div>
      </button>
    );
  }
  
};
```

This example shows how easy you can use props for generating class names. 

Rendering `Button` with different props:

```js
<Button /> //button button--default
<Button type='success' /> //button button--success
<Button type='success' disabled /> //button button--success is-disabled

```
