import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import gettext from 'js-utils/gettext';
import InputField from 'eventbrite_design_system/inputField/InputField';
import Checkbox from 'eventbrite_design_system/checkbox/Checkbox';
import Button from 'eventbrite_design_system/button/Button';
import Icon from 'eventbrite_design_system/icon/Icon';
import {STYLE_STATIC} from 'eventbrite_design_system/inputField/constants';

import {FILTERS_PROP_TYPE} from '../constants';

export default class TicketAssociationFilters extends PureComponent {
    static propTypes = {
        filters: FILTERS_PROP_TYPE,
        updateFilters: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            eventFilter: '',
            ticketFilter: '',
            selectedOnly: false,
            
            //overwrite from props
            ...props.filters,
        };
    }

    componentWillReceiveProps(nextProps) {
        // pull in latest filters from state changes (post update)
        // since filters are all in memory there shouldn't be a race condition between save and continuing to type
        this.setState({
            ...nextProps.filters,
        });
    }

    _handleFilterInputChange = (key) => (value) => {
        this.setState({
            [key]: value,
        });
    }

    _handleFilterClick = () => {
        this.props.updateFilters(this.state);
    }


    render() {
        let {eventFilter, ticketFilter, selectedOnly} = this.state;

        return (
            <div className="eds-g-group eds-l-mar-vert-2">
                <div className="eds-g-cell eds-g-cell-4-12 eds-l-pad-hor-2">
                    <InputField
                        id="eventFilter"
                        label={gettext('Search by event name')}
                        value={eventFilter}
                        onChange={this._handleFilterInputChange('eventFilter')}
                        style={STYLE_STATIC}
                    />
                </div>
                <div className="eds-g-cell eds-g-cell-4-12 eds-l-pad-hor-2">
                    <InputField
                        id="ticketFilter"
                        label={gettext('Search by ticket name')}
                        value={ticketFilter}
                        onChange={this._handleFilterInputChange('ticketFilter')}
                        style={STYLE_STATIC}
                    />
                </div>
                <div className="eds-g-cell eds-g-cell-2-12 eds-l-pad-hor-1 eds-l-pad-vert-4">
                    <Checkbox
                        id="selectedOnly"
                        value={selectedOnly}
                        onChange={this._handleFilterInputChange('selectedOnly')}
                    >
                        {gettext('Selected Only')}
                    </Checkbox>
                </div>
                <div className="eds-g-cell eds-g-cell-2-12 eds-l-pad-hor-2 eds-l-pad-vert-2">
                    <Button style="neutral" onClick={this._handleFilterClick}>
                        <Icon type="filter" />
                        <span className="eds-show-up-md">Filter</span>
                    </Button>
                </div>
            </div>
        );
    }
}
