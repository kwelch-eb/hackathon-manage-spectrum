import {stub} from '../common/utils/test';
import * as v3Utils from '../common/utils/v3';

import {
    loadTicketAssociations,
    postTicketAssociations,
    loadEventGroupWithTickets
} from './api';

describe('loadTicketAssociations', () => {
    it('should return a promise', () => {
        stub(v3Utils, 'fetchAll', () => Promise.resolve({objects: []}));
        
        let promise = loadTicketAssociations();
        
        expect(promise).toBeInstanceOf(Promise);
        v3Utils.fetchAll.mockRestore();
        
        return promise;
    });
    
    it('should return normalized ticket associations', () => {
        stub(v3Utils, 'fetchAll', () => Promise.resolve({objects: [
            {
                id: '999', 
                masterTicketId: '1', 
                masterEventId: '123', 
                childTicketId: '2', 
                status: 'active',
            },
            {
                id: '888', 
                masterTicketId: '3', 
                masterEventId: '456', 
                childTicketId: '4', 
                status: 'inactive',
            },
        ]}));
        
        return loadTicketAssociations('1', '123').then((results) => {
            expect(results).toEqual({
                result: ['999', '888'],
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
            });
            v3Utils.fetchAll.mockRestore();
        });
    });
});

describe('postTicketAssociations', () => {
    it('should return a promise', () => {
        stub(v3Utils, 'fetchV3', () => Promise.resolve({'ticket_associations': []}));
        
        let promise = postTicketAssociations('123', '1', {});
        
        expect(promise).toBeInstanceOf(Promise);
        v3Utils.fetchV3.mockRestore();
        
        return promise;
    });

    it('should make a post to proper endpoint with valid data', () => {
        stub(v3Utils, 'fetchV3', () => Promise.resolve({'ticket_associations': []}));
        
        return postTicketAssociations('123', '1', {'2': 'active'})
            .then(() => {
                expect(v3Utils.fetchV3).toHaveBeenCalled();
                expect(v3Utils.fetchV3).lastCalledWith(
                    '/api/v3/events/123/ticket_classes/1/associations/',
                    {
                        body: '{"child_tickets_with_status":[{"status":"active","child_ticket_id":"2"}]}',
                        method: 'POST',
                    }
                );
                v3Utils.fetchV3.mockRestore();
            });
    });
    
    it('should return normalized ticket associations', () => {
        stub(v3Utils, 'fetchV3', () => Promise.resolve({'ticket_associations': [
            {
                id: '999', 
                masterTicketId: '1', 
                masterEventId: '123', 
                childTicketId: '2', 
                status: 'active',
            },
        ]}));
        
        return postTicketAssociations('1', '123', {'2': 'active'}).then((results) => {
            expect(results).toEqual({
                result: ['999'],
                entities: {
                    ticketAssociations: {
                        '999': {
                            id: '999', 
                            masterTicketId: '1', 
                            masterEventId: '123', 
                            childTicketId: '2', 
                            status: 'active',
                        },
                    },
                },
            });
            v3Utils.fetchV3.mockRestore();
        });
    });
});


describe('loadEventGroupWithTickets', () => {
    it('should return a promise', () => {
        stub(v3Utils, 'fetchAll', () => Promise.resolve({objects: []}));
        
        let promise = loadEventGroupWithTickets('555');
        
        expect(promise).toBeInstanceOf(Promise);
        v3Utils.fetchAll.mockRestore();
        
        return promise;
    });

    it('should make a get request to the correct url', () => {
        stub(v3Utils, 'fetchAll', () => Promise.resolve({objects: []}));
        
        let promise = loadEventGroupWithTickets('555');
        
        expect(v3Utils.fetchAll).toHaveBeenCalledTimes(1);
        expect(v3Utils.fetchAll).lastCalledWith('/api/v3/event_groups/555/events/?expand=ticket_classes', 'events');
        v3Utils.fetchAll.mockRestore();
        
        return promise;
    });

    it('should return a normalized list of events and tickets', () => {
        stub(v3Utils, 'fetchAll', () => Promise.resolve({objects: [
            {
                id: '1',
                name: {
                    text: 'Event #1',
                },
                'ticket_classes': [{
                    id: '123',
                    name: 'Ticket A',
                    'event_id': '1',
                }, {
                    id: '456',
                    name: 'Ticket B',
                    'event_id': '1',
                }],
            },
            {
                id: '2',
                name: {
                    text: 'Event #2',
                },
                'ticket_classes': [{
                    id: '111',
                    name: 'General Admission',
                    'event_id': '2',
                }],
            },
        ]}));
        
        return loadEventGroupWithTickets('555').then((actual) => {
            expect(actual).toEqual({
                result: ['1', '2'],
                entities: {
                    events: {
                        '1': {
                            id: '1',
                            name: {
                                text: 'Event #1',
                            },
                            ticketClasses: ['123', '456'],
                        },
                        '2': {
                            id: '2',
                            name: {
                                text: 'Event #2',
                            },
                            ticketClasses: ['111'],
                        },
                    },
                    ticketClasses: {
                        '111': {
                            id: '111',
                            name: 'General Admission',
                            eventId: '2',
                        },
                        '123': {
                            id: '123',
                            name: 'Ticket A',
                            eventId: '1',
                        },
                        '456': {
                            id: '456',
                            name: 'Ticket B',
                            eventId: '1',
                        },
                    },
                },
            });

            v3Utils.fetchAll.mockRestore();
        });
    });
});
