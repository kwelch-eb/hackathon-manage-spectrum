import React from 'react';
import {connect} from 'react-redux';

import LandingPage from '../Pages/LandingPage';
import {
    initializeApp,
    redirectToTicketCreation,   
    openMasterTicketEdit
} from '../actions';
import {LOCALIZED_TEXT} from '../constants';
import {getTicketsByEventId, getActiveTicketAssociationsByMasterTicketId} from '../selectors';

const AssociationCountButton = ({count}) => {
    let text = count || LOCALIZED_TEXT.landing.addTickets;

    return (<span className="eds-link">{text}</span>);
};

const mapTicketClassesToLandingPage = (
    state,
    {
        id,
        name,
    }
) => {
    let activeAssociations = getActiveTicketAssociationsByMasterTicketId(state, id);

    return {
        id,
        name,
        associationsCount: activeAssociations.length,
        associationsCountDisplay: (<AssociationCountButton count={activeAssociations.length} />),
    };
};

const _mapStateToProps = (state, props) => ({
    tickets: getTicketsByEventId(state, props).map((ticket) => mapTicketClassesToLandingPage(state, ticket)),
});

const _mapDispatchToProps = {
    initializeApp,
    redirectToTicketCreation,
    openMasterTicketEdit,
};

export default connect(_mapStateToProps, _mapDispatchToProps)(LandingPage);
