import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ArchivedCards from './ArchivedCards';
import reducer from '../../reducers';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<ArchivedCards /> unit test', () => {
    const getWrapper = (mockStore = createStore(reducer, { board: { board: {
      cardObjects,
      listObjects
    }}})) => mount(
        <Provider store={mockStore}>
            <ArchivedCards/>
        </Provider>
    );

    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem = jest.fn();

  it('should add to count and display the correct # of counts', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem = jest.fn();

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