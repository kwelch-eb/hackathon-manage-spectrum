import React from 'react';
import {shallow, mount} from 'enzyme';
import Checkbox from 'eventbrite_design_system/checkbox/Checkbox';

import {
    EVENT
} from '../__fixtures__/data';
import EventSelectionTicketGroup, {createEventTicketAssociationStatuses} from './EventSelectionTicketGroup';

describe('<EventSelectionTicketGroup />', () => {
    it('should render a Checkbox for each ticket', () => {
        let wrapper = shallow(
            <EventSelectionTicketGroup
                event={EVENT}
                onChange={jest.fn()}
            />
        );

        expect(wrapper.find(Checkbox)).toHaveLength(EVENT.ticketClasses.length);
    });

    it('should call onChange when radio is clicked', () => {
        let mockChange = jest.fn();
        let wrapper = mount(
            <EventSelectionTicketGroup
                event={EVENT}
                onChange={mockChange}
            />
        );

        wrapper.find('[data-automation="checkbox-ticket-1"]').simulate('change');

        expect(mockChange).toHaveBeenCalledTimes(1);
        expect(mockChange).lastCalledWith({
            '1': 'active',
            '2': 'inactive',
        });
    });
});

describe('createEventTicketAssociationStatuses', () => {
    it('should return an object', () => {
        let allTicketIds = [];
        let actual = createEventTicketAssociationStatuses({allTicketIds}, '');

        expect(actual).not.toBe(null);
        expect(actual).toEqual({});
    });

    it('should have a key for each ticketId', () => {
        let allTicketIds = ['1', '2', '3'];
        let actual = createEventTicketAssociationStatuses({allTicketIds}, '');

        expect(actual).toEqual({
            '1': expect.any(String),
            '2': expect.any(String),
            '3': expect.any(String),
        });
    });

    it('should mark all values as inactive unless ticketId matches passed in value', () => {
        let allTicketIds = ['1', '2', '3'];
        let actual = createEventTicketAssociationStatuses({allTicketIds}, '2');

        expect(actual).toEqual({
            '1': 'inactive',
            '2': 'active',
            '3': 'inactive',
        });
    });
});
