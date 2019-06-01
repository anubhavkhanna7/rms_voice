import React from 'react';
import { shallow } from 'enzyme';
import Login from './login';

describe('render', () => {
    it('renders homepage', () => { 
        const HomeComponent = shallow( 
            <Login />
        );
        expect(HomeComponent).toMatchSnapshot();
    });
});
