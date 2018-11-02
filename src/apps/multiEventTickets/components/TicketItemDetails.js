import React, {PureComponent} from 'react';
import {TICKET_STATUS_MAP} from 'eventbrite_design_system/ticketDisplayCardContent/ticketStatusConstants';
import gettext from 'js-utils/gettext';

import {getTicketDateTimeAndStatus} from '../../common/tickets/utils';
import {TICKET_PROP_TYPE, EVENT_PROP_TYPE} from '../constants';
import './TicketItemDetails.scss';

export default class TicketItemDetails extends PureComponent {
    static propTypes = {
        ticket: TICKET_PROP_TYPE.isRequired,
        event: EVENT_PROP_TYPE.isRequired,
    };
    
    _getTicketStatus = () => {
        let {ticket, event: {start: {timezone: eventTimezone} = {}}} = this.props;
        let {statusKey} = getTicketDateTimeAndStatus(ticket, eventTimezone);

        return TICKET_STATUS_MAP[statusKey] || {
            iconType: 'status-dot-chunky',
            iconColor: 'grey-400',
            displayStatus: gettext('Unknown'),
        };
    };
    
    render() {
        let {ticket} = this.props;

        return (
            <div className="eds-g-cell eds-g-cell-1-1 ticket-details-container">
                <div className="eds-l-pad-right-4 eds-l-pad-left-3">
                    <h3 className="eds-text-bl--fixed eds-text-height--open eds-text-color--grey-700" data-automation="met-ticket-name">
                        {ticket.name}
                    </h3>
                </div>
            </div>
        );
    }
}
