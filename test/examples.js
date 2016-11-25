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

  it('not defined class', function() {
    assert.equal(style('input'), 'input');
  });

  it('not defined class, but passed as object', function() {
    assert.equal(style({ name: 'input', states: ['active'] }, { active: true }), 'input is-active');
  });

  it('with modifier', function() {
    assert.equal(style('button', { success: true }), 'button--success button');
  });

  it('with state', function() {
    assert.equal(style('button', { disabled: true }), 'is-disabled button');
  });

  it('namespace', function() {
    assert.equal(style('&'), 'button');
    assert.equal(style('&inner'), 'button__inner');
  });

  it('add modifier', function() {
    style.modifier('button', 'type');
    assert.equal(style('button', { type: 'success' }), 'button--success button');
  });

  it('plus other classname', function() {
    assert.equal(style('button', 'form__button'), 'button form__button');
  });

});
