/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]*/
import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import chai, { expect } from 'chai';
import React from 'react';
import chaiJquery from 'chai-jquery';

// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jquery(global.window);

// build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props) {
  let node = null;
  TestUtils.renderIntoDocument(
    <ComponentClass {...props} ref={n => (node = n)} />
  );

  return node;
}

// Build helper for simulating events
$.fn.simulate = (eventName, value) => {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
