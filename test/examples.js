/* global describe, it */
var chai = require('chai');
var assert = chai.assert;

describe('examples', function() {

  var style = require('../examples/dist');

  it('simple class', function() {
    assert.equal(style('button'), 'button');
  });

  it('inner class', function() {
    assert.equal(style('button__inner'), 'button__inner');
  });

  it('plus another class', function() {
    assert.equal(style('button', 'form__button'), 'button form__button');
  });

  it('not defined class', function() {
    assert.equal(style('input'), 'input');
  });

  it('with modifier', function() {
    assert.equal(style('button', { type: 'success' }), 'button button--type-success');
  });

  it('with state', function() {
    assert.equal(style('button', { disabled: true }), 'button is-disabled');
  });

  it('namespace', function() {
    assert.equal(style('&'), 'button');
    assert.equal(style('&inner'), 'button__inner');
  });

  it('add class', function() {
    style.class('input');
    style.state('input', 'focused');
    assert.equal(style('input', { focused: true }), 'input is-focused');
  });

  it('add modifier', function() {
    style.class('input');
    style.modifier('input', 'type', ['success']);
    assert.equal(style('input', { type: 'success' }), 'input input--type-success');
  });

  it('add state', function() {
    style.class('input');
    style.state('input', 'state', ['active']);
    assert.equal(style('input', { state: 'active' }), 'input is-state-active');
  });

  it('multiple classnames as first parameter', function() {
    style.class('input');
    style.modifier('input', 'type', ['success']);
    assert.equal(style(['button', 'input'], { type: 'success', disabled: true }), 'button button--type-success is-disabled input input--type-success');
  });

  it('multiple arguments', function() {
    assert.equal(style('button', { type: 'success' }, { borderless: true, disabled: true }, 'MyCustomButton'), 'button button--type-success button--borderless is-disabled MyCustomButton');
  });

  it('false prop', function() {
    assert.equal(style('button', { borderless: false }), 'button');
  });

});
