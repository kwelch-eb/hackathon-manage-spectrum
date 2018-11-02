import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'eventbrite_design_system/checkbox/Checkbox';

import EventGroupTitle from './EventGroupTitle';
import {
    EVENT_PROP_TYPE,
    ASSOCIATION_STATUS,
    ASSOCIATION_STATUSES_PROP_TYPE
} from '../constants';

export const createEventTicketAssociationStatuses = ({allTicketIds = []}, selectedTicketId) => (
    allTicketIds.reduce((acc, ticketId) => ({
        ...acc,
        [ticketId]: ticketId === selectedTicketId ? ASSOCIATION_STATUS.ACTIVE : ASSOCIATION_STATUS.INACTIVE,
    }), {})
);

export default class EventSelectionTicketGroup extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        associationStatuses: ASSOCIATION_STATUSES_PROP_TYPE,
        onChange: PropTypes.func.isRequired,
    };
    static defaultProps = {
        event: {ticketIds: [], ticketClasses: []},
        associationStatuses: {},
    };

    _handleChange = (selectedValue) => () => {
        let {event, onChange, associationStatuses} = this.props;

        // if value is active set it to inactive
        if (associationStatuses[selectedValue] === ASSOCIATION_STATUS.ACTIVE) {
            return onChange({[selectedValue]: ASSOCIATION_STATUS.INACTIVE});
        }
        
        // create an associationStatus object with a key for each ticketId of the event and its current status on change
        // the modal will handle diff-ing out unnecessary updates
        let updatedAssociations = createEventTicketAssociationStatuses(event, selectedValue);

        return onChange(updatedAssociations);
    }

    render() {
        let {
            event,
            associationStatuses,
        } = this.props;

        let checkboxList = event.ticketClasses.map((ticket) => {
            let isSelected = associationStatuses[ticket.id] === ASSOCIATION_STATUS.ACTIVE;

            return (
                <div className="eds-g-cell eds-g-cell-1-1" key={ticket.id}>
                    <Checkbox
                        id={`ticket-${ticket.id}`}
                        value={isSelected}
                        onChange={this._handleChange(ticket.id)}
                    >
                        {ticket.name}
                    </Checkbox>
                </div>
            );
        });

        return (
            <div className="eds-g-row eds-l-pad-bot-4 eds-l-pad-top-3">
                <EventGroupTitle event={event} />
                {checkboxList}
            </div>
        );
    }
} 
