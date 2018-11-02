import {ASSOCIATION_STATUS} from './constants';

export const getTicketsByEventId = (
    {entities: {ticketClasses = {}}},
    {eventId}
) => (
    Object.values(ticketClasses).filter((ticket) => +ticket.eventId === +eventId)
);

const _getTicketAssociationsByMasterTicketId = (
    {entities: {ticketAssociations = {}}},
    masterTicketId
) => (
    Object.values(ticketAssociations).filter((association) => (association.masterTicketId === masterTicketId))
);

export const getActiveTicketAssociationsByMasterTicketId = (
    state,
    masterTicketId
) => (
    _getTicketAssociationsByMasterTicketId(state, masterTicketId)
        .filter((association) => association.status === ASSOCIATION_STATUS.ACTIVE)
);

export const getAssociationAsChildStatus = (state, {masterTicketId}) => (
    _getTicketAssociationsByMasterTicketId(state, masterTicketId)
        .reduce((acc = {}, association) => ({
            ...acc,
            [association.childTicketId]: association.status,
        }), undefined)
);
