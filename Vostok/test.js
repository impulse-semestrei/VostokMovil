
import 'react-native';
import React from 'react';
import Login from './Login.js';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Login />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
