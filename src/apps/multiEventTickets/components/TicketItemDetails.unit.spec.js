import React from 'react';
import {shallow} from 'enzyme';

import TicketItemDetails from './TicketItemDetails';
import TicketSalesStatus from './TicketSalesStatus';

import {TICKET, EVENT} from '../__fixtures__/data';

describe('<TicketItemDetails />', () => {
    it('should render ticket name', () => {
        let wrapper = shallow(<TicketItemDetails ticket={TICKET} event={EVENT} />);

        expect(wrapper.find('[data-automation="met-ticket-name"]')).toHaveText(TICKET.name);
    });

    xit('should render ticket cost', () => {
        let wrapper = shallow(<TicketItemDetails ticket={TICKET} event={EVENT} />);
        let ticketStatusWrapper = wrapper.find(TicketSalesStatus); 

        expect(ticketStatusWrapper).toBePresent();
        expect(ticketStatusWrapper).toHaveProp('iconColor', 'aloe-green-500');
        expect(ticketStatusWrapper).toHaveProp('iconType', 'status-dot-chunky');
    });
});
