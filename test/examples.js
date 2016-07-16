var chai = require('chai');
var assert = chai.assert;

describe('examples', function() {

  require('../examples/dist');

  it('simple class', function() {
    assert.equal(global.style('button'), 'button');
  });

  it('inner class', function() {
    assert.equal(global.style('button__inner'), 'button__inner');
  });

  it('not defined class', function() {
    assert.equal(global.style('input'), 'input');
  });

  it('not defined class, but passed as object', function() {
    assert.equal(global.style({ name: 'input', states: ['active'] }, { active: true }), 'input is-active');
  });

  it('with modifier', function() {
    assert.equal(global.style('button', { success: true }), 'button button--success');
  });

  it('with state', function() {
    assert.equal(global.style('button', { disabled: true }), 'button is-disabled');
  });

  it('namespace', function() {
    assert.equal(global.style('&__inner'), 'button__inner');
  });

  it('add modifier', function() {
    global.style.modifier('button', 'type');
    assert.equal(global.style('button', { type: 'success' }), 'button button--success');
  });

  it('plus other classname', function() {
    assert.equal(global.style('button', 'form__button'), 'button form__button');
  });

});
