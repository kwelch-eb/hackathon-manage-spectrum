import React from 'react';
import moment from 'js-utils/moment';
import {shallow} from 'enzyme';

import EventGroupTitle from './EventGroupTitle';

const EVENT = {
    id: '1',
    name: {
        text: 'Event A',
    },
    start: moment('2018-01-01T12:30:00Z'),
};

describe('<EventGroupTitle />', () => {
    it('should render name', () => {
        let wrapper = shallow(<EventGroupTitle event={EVENT} />);

        expect(wrapper.find('h4').text()).toEqual(EVENT.name.text);
    });
    
    it('should render formmatted start date', () => {
        let wrapper = shallow(<EventGroupTitle event={EVENT} />);

        expect(wrapper.find('p').text()).toEqual('Mon, Jan 1, 2018 12:30 PM');
    });
});
