import React from 'react';
import {shallow} from 'enzyme';

import TicketCostDisplay from './TicketCostDisplay';

describe('<TicketCostDisplay />', () => {
    it('should return no text if hidden is false', () => {
        let wrapper = shallow(
            <TicketCostDisplay
                free={true}
            />
        );

        expect(wrapper).toHaveText('Free');
    });

    it('should return text if hidden is true', () => {
        let wrapper = shallow(
            <TicketCostDisplay
                donation={true}
            />
        );

        expect(wrapper).toIncludeText('Donation');
    });


    it('should return text if hidden is true', () => {
        let wrapper = shallow(
            <TicketCostDisplay
                cost={{display: '$100.00'}}
            />
        );

        expect(wrapper).toIncludeText('$100.00');
    });
});
