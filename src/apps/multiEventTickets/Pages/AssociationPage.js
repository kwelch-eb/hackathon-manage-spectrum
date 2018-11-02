import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Divider from 'eventbrite_design_system/divider/Divider';

import ConfirmNavigationDialog from '../../common/components/confirm-navigation-dialog/ConfirmNavigationDialog';
import TicketAssociationFilters from '../components/TicketAssociationFilters';
import EventSelectionTicketGroup from '../components/EventSelectionTicketGroup';
import NavigationActionBar from '../components/NavigationActionBar';

import {
    TICKET_PROP_TYPE,
    ASSOCIATION_STATUSES_PROP_TYPE,
    FILTERS_PROP_TYPE,
    ASSOCIATION_STATUS
} from '../constants';

const _isValueChanged = (oldValue, newValue) => {
    let valueHasChanged = oldValue && oldValue !== newValue;
    let valueIsNewAndActive = !oldValue && newValue === ASSOCIATION_STATUS.ACTIVE;

    return valueHasChanged || valueIsNewAndActive;
};

export const calculateChangesToSave = (oldState = {}, newState = {}) => (
    Object.keys(newState).reduce((acc, childTicketId) => {
        let oldValue = oldState[childTicketId];
        let newValue = newState[childTicketId];

        if (_isValueChanged(oldValue, newValue)) {
            return {
                ...acc,
                [childTicketId]: newValue,
            };
        }

        return acc;
    }, {})
);

export const getIsDirty = (oldState = {}, newState = {}) => (
    Object.keys(newState).some((childTicketId) => {
        let oldValue = oldState[childTicketId];
        let newValue = newState[childTicketId];

        return _isValueChanged(oldValue, newValue);
    })
);

export default class AssociationPage extends PureComponent {
    static propTypes = {
        filteredEvents: PropTypes.arrayOf(PropTypes.object),
        initialAssociationStatuses: ASSOCIATION_STATUSES_PROP_TYPE,
        filters: FILTERS_PROP_TYPE,
        masterTicket: TICKET_PROP_TYPE,
        initializeApp: PropTypes.func.isRequired,
        updateFilters: PropTypes.func.isRequired,
        updateTicketAssociations: PropTypes.func.isRequired,
        navigateToLandingPage: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            associationStatuses: props.initialAssociationStatuses || undefined,
        };
    }

    componentDidMount() {
        let {
            initializeApp,
            masterTicket,
            params: {eventId},
            route: {eventGroupId},
        } = this.props;

        if (!masterTicket) {
            initializeApp(eventId, eventGroupId);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => ({
            associationStatuses: prevState.associationStatuses || nextProps.initialAssociationStatuses,
        }));
    }

    _handleUpdateStatuses = (updatedStatuses) => {
        this.setState((prevState) => ({
            associationStatuses: {
                ...prevState.associationStatuses,
                ...updatedStatuses,
            },
        }));
    }

    _handleSave = () => {
        let {
            params: {eventId, masterTicketId},
            initialAssociationStatuses,
            updateTicketAssociations,
        } = this.props;
        let updatedStatuses = calculateChangesToSave(initialAssociationStatuses, this.state.associationStatuses);

        updateTicketAssociations(eventId, masterTicketId, updatedStatuses);
    }

    _handleBack = () => {
        let {
            navigateToLandingPage,
            params: {eventId},
        } = this.props;

        navigateToLandingPage(eventId);
    };

    render() {
        let {
            masterTicket = {},
            route,
            filters,
            updateFilters,
            initialAssociationStatuses,
            filteredEvents = [],
        } = this.props;
        let {associationStatuses} = this.state;
        let isDirty = getIsDirty(initialAssociationStatuses, associationStatuses);

        let eventSelectionList = filteredEvents.map((event) => (
            <EventSelectionTicketGroup
                key={event.id}
                event={event}
                associationStatuses={associationStatuses}
                onChange={this._handleUpdateStatuses}
            />
        ));

        return (
            <div className="eds-g-grid">
                <div className="eds-g-group">
                    <div className="eds-g-cell">
                        <h1 className="eds-text-hl">{masterTicket.name}</h1>
                    </div>
                    <ConfirmNavigationDialog
                        route={route}
                        onSave={this._handleSave}
                        shouldConfirm={isDirty}
                    />
                    <TicketAssociationFilters filters={filters} updateFilters={updateFilters} />
                    <Divider />
                </div>
                <div className="eds-g-group">
                    {eventSelectionList}
                </div>
                <NavigationActionBar
                    isSaveDisabled={!isDirty}
                    onSave={this._handleSave}
                    onBack={this._handleBack}
                />
            </div>
        );
    }
}
