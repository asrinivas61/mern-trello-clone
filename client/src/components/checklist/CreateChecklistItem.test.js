import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import CreateChecklistItem from './CreateChecklistItem';
import reducer from '../../reducers';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<CreateChecklistItem /> unit test', () => {
    const getWrapper = (mockStore = createStore(reducer, { board: { board: {
      cardObjects,
      listObjects
    }}})) => mount(
        <Provider store={mockStore}>
            <CreateChecklistItem/>
        </Provider>
    );

  it('should add to count and display the correct # of counts', () => {
    jest.spyOn(localStorage, 'getItem');
    localStorage.getItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => 'bla');
    const spy = jest.spyOn(Storage.prototype, 'getItem');

    const wrapper = getWrapper();
    expect(wrapper.find('h3').text()).toEqual('Count: 0');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('h3').text()).toEqual('Count: 1');
  });

  it('should dispatch the correct action on button click', () => {
    // const mockStore = createStore(reducer, { count: 0 });
    // mockStore.dispatch = jest.fn();

    // const wrapper = getWrapper(mockStore);
    // wrapper.find('button').simulate('click');
    // expect(mockStore.dispatch).toHaveBeenCalledWith(addCount());
  });
});