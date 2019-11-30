/**
 * @format
 */

import 'react-native';
import React from 'react';
import Login from '../Login.js';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
//  renderer.create(<App />);
const tree = renderer.create(
    <Login />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
