import {
    getTicketsByEventId,
    getAssociationAsChildStatus,
    getActiveTicketAssociationsByMasterTicketId
} from './selectors';

describe('getTicketsByEventId', () => {
    it('should return an array of tickets', () => {
        let state = {
            entities: {
                ticketClasses: {
                    '123': {
                        id: '123',
                        eventId: '1',
                        name: 'Ticket A',
                    },
                },
            },
        };
        let results = getTicketsByEventId(state, {eventId: '1'});

        expect(results).toEqual([
            {
                id: '123',
                eventId: '1',
                name: 'Ticket A',
            },
        ]);
    });

    it('should only return tickets from the current event', () => {
        let state = {
            entities: {
                ticketClasses: {
                    '123': {
                        id: '123',
                        eventId: '1',
                        name: 'Ticket A',
                    },
                    '456': {
                        id: '456',
                        eventId: '2',
                        name: 'Ticket B',
                    },
                },
            },
        };
        let results = getTicketsByEventId(state, {eventId: '1'});

        expect(results).toEqual([
            {
                id: '123',
                eventId: '1',
                name: 'Ticket A',
            },
        ]);
    });
});

describe('getActiveTicketAssociationsByMasterTicketId', () => {
    it('should return empty array by default', () => {
        let results = getActiveTicketAssociationsByMasterTicketId({entities: {}}, undefined);

        expect(results).not.toBe(null);
        expect(results).toEqual([]);
    });

    it('should return a list of object given a list of ids', () => {
        let state = {
            entities: {
                ticketAssociations: {
                    '999': {
                        id: '999', 
                        masterTicketId: '1', 
                        masterEventId: '123', 
                        childTicketId: '2', 
                        status: 'active',
                    },
                    '888': {
                        id: '888', 
                        masterTicketId: '3', 
                        masterEventId: '456', 
                        childTicketId: '4', 
                        status: 'inactive',
                    },
                },
            },
        };
        let results = getActiveTicketAssociationsByMasterTicketId(state, '1');

        expect(results).toEqual([
            {
                id: '999', 
                masterTicketId: '1', 
                masterEventId: '123', 
                childTicketId: '2', 
                status: 'active',
            },
        ]);
    });
});

describe('getAssociationAsChildStatus', () => {
    it('should return undefined by default', () => {
        let actual = getAssociationAsChildStatus({entities: {}}, {associations: []});

        expect(actual).toEqual(undefined);
    });

    it('should return a list of object given a list of ids', () => {
        let state = {
            entities: {
                ticketAssociations: {
                    '999': {
                        id: '999', 
                        masterTicketId: '1', 
                        masterEventId: '123', 
                        childTicketId: '2', 
                        status: 'active',
                    },
                    '888': {
                        id: '888', 
                        masterTicketId: '3', 
                        masterEventId: '456', 
                        childTicketId: '4', 
                        status: 'active',
                    },
                },
            },
        };
        let actual = getAssociationAsChildStatus(state, {masterTicketId: '1'});

        expect(actual).toEqual({'2': 'active'});
    });
});
