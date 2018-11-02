import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'eventbrite_design_system/icon/Icon';
import EBPropTypes from 'js-utils/prop-types';

export default class TicketSalesStatus extends PureComponent {
    static propTypes = {
        iconColor: PropTypes.string.isRequired,
        iconType: PropTypes.string.isRequired,
        displayStatus: EBPropTypes.translation.isRequired,
    };
    
    render() {
        let {iconColor, iconType, displayStatus} = this.props;
        let statusIconClass = classnames(
            'eds-show-up-mn',
            'eds-ticket-card-status-icon',
            'eds-l-mar-right-1',
        );
    
        return (<div className="eds-g-cell eds-l-mar-right-3">
            <Icon
                type={iconType}
                color={iconColor}
                size="xsmall"
                className={statusIconClass}
            /> 
            <span>{displayStatus}</span>
        </div>);
    }
}
