import React from 'react';
import {mount} from 'enzyme';
import gettext from 'js-utils/gettext';

import TicketSalesStatus from './TicketSalesStatus';

describe('<TicketSalesStatus />', () => {
    it('should render', () => {
        let wrapper = mount(
            <TicketSalesStatus
                iconType="status-dot-chunky"
                iconColor="ui-green"
                displayStatus={gettext('On Sale')}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});
