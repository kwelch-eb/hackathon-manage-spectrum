import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import gettext from 'js-utils/gettext';

export default class TicketCostDisplay extends PureComponent {
    static propTypes = {
        free: PropTypes.bool,
        donation: PropTypes.bool,
        cost: PropTypes.shape({
            display: PropTypes.string.isRequired,
        }),
    };

    render() {
        let {free, donation, cost = {}} = this.props;
        let displayText = '';

        if (free) {
            displayText = gettext('Free');
        } else if (donation) {
            displayText = gettext('Donation');
        } else {
            displayText = cost.display;
        }

        return (
            <div className="eds-g-cell eds-l-mar-right-3 eds-text-weight--light">
                {displayText}
            </div>
        );
    }
}
