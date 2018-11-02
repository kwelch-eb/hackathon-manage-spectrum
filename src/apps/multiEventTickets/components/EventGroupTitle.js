import React, {PureComponent} from 'react';

import {getFormattedDateTime} from 'js-utils/datetime';
import {EVENT_PROP_TYPE} from '../constants';

export default class EventGroupTitle extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE,
    };

    render() {
        const {event} = this.props;
        let formattedStartDate = getFormattedDateTime(
            event.start,
            false
        );

        return (
            <div className="eds-g-cell eds-g-cell-12-12">
                <h4 className="eds-test-hs">{event.name.text}</h4>
                <p className="eds-text-bm eds-text-weight--light eds-text-height--open">{formattedStartDate}</p>
            </div>
        );
    }
}
