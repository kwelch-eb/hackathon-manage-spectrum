import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Icon from 'eventbrite_design_system/icon/Icon';
import gettext from 'js-utils/gettext';

export default class TicketHiddenStatus extends PureComponent {
    static propTypes = {
        hidden: PropTypes.bool,
    }

    render() {
        let {hidden} = this.props;

        if (hidden) {
            return (<div className="eds-g-cell eds-l-mar-right-3">
                <span className="eds-show-up-mn eds-l-mar-right-1">
                    <Icon type="eye-off-chunky" size="xsmall" />
                </span> 
                <span>
                    {gettext('Hidden')}
                </span>
            </div>);
        }

        return null;
    }
}
