import {getFilteredEventsWithTickets} from './ConnectedAssociationPage';
import {NORMALIZED_EVENTS, NORMALIZED_TICKETS, TICKET_ASSOCIATION} from '../__fixtures__/data';

let STATE = {
    entities: {
        events: NORMALIZED_EVENTS,
        ticketClasses: NORMALIZED_TICKETS,
        ticketAssociations: {
            [TICKET_ASSOCIATION.id]: TICKET_ASSOCIATION,
        },
    },
    filters: {},
};
let EVENT_ID = '123';
let MASTER_TICKET_ID = '1';

describe('getFilteredEventsWithTickets', () => {
    it('should return empty list when no filters are set', () => {

        let actual = getFilteredEventsWithTickets(STATE, {eventId: EVENT_ID, masterTicketId: MASTER_TICKET_ID});

        expect(actual).toEqual([]);
    });

    describe('selectedOnly Filter', () => {
        it('should on child tickets', () => {
            let actual = getFilteredEventsWithTickets({
                ...STATE,
                filters: {
                    selectedOnly: true,
                },
            }, {eventId: EVENT_ID, masterTicketId: MASTER_TICKET_ID});
    
            expect(actual).toEqual([
                expect.objectContaining({
                    id: '456',
                    name: {text: 'Event B'},
                    allTicketIds: ['3'],
                    ticketClasses: expect.arrayContaining([
                        expect.objectContaining({
                            id: '3',
                            name: 'Ticket #2',
                        }),
                    ]),
                }),
            ]);
        });

        it('should allow ticket filter to remove tickets', () => {
            let actual = getFilteredEventsWithTickets({
                ...STATE,
                filters: {
                    ticketFilter: 'General',
                    selectedOnly: true,
                },
            }, {eventId: EVENT_ID, masterTicketId: MASTER_TICKET_ID});
    
            expect(actual).toEqual([]);
        });

        it('should allow ticket filter will only show tickets', () => {
            let actual = getFilteredEventsWithTickets({
                ...STATE,
                filters: {
                    selectedOnly: true,
                    ticketFilter: 'Ticket',
                },
            }, {eventId: EVENT_ID, masterTicketId: MASTER_TICKET_ID});
    
            expect(actual).toEqual([
                expect.objectContaining({
                    id: '456',
                    name: {text: 'Event B'},
                    allTicketIds: ['3'],
                    ticketClasses: expect.arrayContaining([
                        expect.objectContaining({
                            id: '3',
                            name: 'Ticket #2',
                        }),
                    ]),
                }),
            ]);
        });

        it('should allow event filter to remove events', () => {
            let actual = getFilteredEventsWithTickets({
                ...STATE,
                filters: {
                    eventFilter: 'ASDF',
                    selectedOnly: true,
                },
            }, {eventId: EVENT_ID, masterTicketId: MASTER_TICKET_ID});
    
            expect(actual).toEqual([]);
        });


        it('should allow event filter to narrow events', () => {
            let actual = getFilteredEventsWithTickets({
                ...STATE,
                filters: {
                    eventFilter: 'Event',
                    selectedOnly: true,
                },
            }, {eventId: EVENT_ID, masterTicketId: MASTER_TICKET_ID});
    
            expect(actual).toEqual([
                expect.objectContaining({
                    id: '456',
                    name: {text: 'Event B'},
                    allTicketIds: ['3'],
                    ticketClasses: expect.arrayContaining([
                        expect.objectContaining({
                            id: '3',
                            name: 'Ticket #2',
                        }),
                    ]),
                }),
            ]);
        });
    });

    it('should allow ticket filter', () => {
        let actual = getFilteredEventsWithTickets({
            ...STATE,
            filters: {
                ticketFilter: 'Ticket',
                selectedOnly: true,
            },
        }, {eventId: EVENT_ID, masterTicketId: MASTER_TICKET_ID});

        expect(actual).toEqual([expect.objectContaining({
            id: '456',
            name: {text: 'Event B'},
            allTicketIds: ['3'],
            ticketClasses: expect.arrayContaining([
                expect.objectContaining({
                    id: '3',
                    name: 'Ticket #2',
                }),
            ]),
        })]);
    });


    it('should allow event filter', () => {
        let actual = getFilteredEventsWithTickets({
            ...STATE,
            filters: {
                eventFilter: 'Event',
                selectedOnly: true,
            },
        }, {eventId: EVENT_ID, masterTicketId: MASTER_TICKET_ID});

        expect(actual).toEqual([expect.objectContaining({
            id: '456',
            name: {text: 'Event B'},
            allTicketIds: ['3'],
            ticketClasses: expect.arrayContaining([
                expect.objectContaining({
                    id: '3',
                    name: 'Ticket #2',
                }),
            ]),
        })]);
    });


    it('should allow event filter and ticket filter', () => {
        let actual = getFilteredEventsWithTickets({
            ...STATE,
            filters: {
                eventFilter: 'Event',
                ticketFilter: 'General',
                selectedOnly: true,
            },
        }, {eventId: EVENT_ID, masterTicketId: MASTER_TICKET_ID});

        expect(actual).toEqual([]);
    });
});
