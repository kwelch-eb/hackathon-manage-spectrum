import React from 'react';
import {shallow} from 'enzyme';

import TicketHiddenStatus from './TicketHiddenStatus';

describe('<TicketHiddenStatus />', () => {
    it('should return no text if hidden is false', () => {
        let wrapper = shallow(
            <TicketHiddenStatus
                hidden={false}
            />
        );

        expect(wrapper).toHaveText('');
    });

    it('should return text if hidden is true', () => {
        let wrapper = shallow(
            <TicketHiddenStatus
                hidden={true}
            />
        );

        expect(wrapper).toIncludeText('Hidden');
    });
});
