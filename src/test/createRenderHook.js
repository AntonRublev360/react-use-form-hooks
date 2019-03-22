import React from 'react';
import { mount } from 'enzyme';

export default function createRenderHook(useHook) {
  function TestHook({ params, renderSpy }) {
    const formField = useHook(params);
    renderSpy(formField);
    return null;
  }
  return (params, renderSpy) =>
    mount(<TestHook params={params} renderSpy={renderSpy} />);
}
