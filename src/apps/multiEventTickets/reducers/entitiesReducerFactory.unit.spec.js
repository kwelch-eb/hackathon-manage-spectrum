import entitiesReducerFactory from './entitiesReducerFactory';

const UPDATE_TICKET = 'update-ticket';
const REMOVE_TICKET = 'remove-ticket';

describe('entitiesReducerFactory', () => {
    it('should fill state from action', () => {
        let initialState = {};
        let newState = entitiesReducerFactory()(initialState, {
            payload: {
                entities: {
                    tickets: {
                        '123': {
                            id: '123',
                            name: 'Ticket A',
                        },
                    },
                },
            },
        });

        expect(newState).toEqual({
            tickets: {
                '123': {
                    id: '123',
                    name: 'Ticket A',
                },
            },
        });
    });

    it('should add to state from action', () => {
        let initialState = {
            tickets: {
                '123': {
                    id: '123',
                    name: 'Ticket A',
                },
            },
        };
        let newState = entitiesReducerFactory()(initialState, {
            payload: {
                entities: {
                    tickets: {
                        '456': {
                            id: '456',
                            name: 'Ticket B',
                        },
                    },
                },
            },
        });

        expect(newState).toEqual({
            tickets: {
                '123': {
                    id: '123',
                    name: 'Ticket A',
                },
                '456': {
                    id: '456',
                    name: 'Ticket B',
                },
            },
        });
    });

    it('should update state from action', () => {
        let initialState = {
            tickets: {
                '123': {
                    id: '123',
                    name: 'Ticket A',
                },
            },
        };
        let newState = entitiesReducerFactory()(initialState, {
            payload: {
                entities: {
                    tickets: {
                        '123': {
                            id: '123',
                            name: 'General Admission',
                        },
                    },
                },
            },
        });

        expect(newState).toEqual({
            tickets: {
                '123': {
                    id: '123',
                    name: 'General Admission',
                },
            },
        });
    });

    it('should not update state if entities is not in payload', () => {
        let initialState = {
            tickets: {
                '123': {
                    id: '123',
                    name: 'Ticket A',
                },
            },
        };
        let newState = entitiesReducerFactory()(initialState, {
            entities: {
                tickets: {
                    '123': {
                        id: '123',
                        name: 'General Admission',
                    },
                },
            },
        });

        expect(newState).toEqual({
            tickets: {
                '123': {
                    id: '123',
                    name: 'Ticket A',
                },
            },
        });
    });

    it('should not update state if payload does not contain entities', () => {
        let initialState = {
            tickets: {
                '123': {
                    id: '123',
                    name: 'Ticket A',
                },
            },
        };
        let newState = entitiesReducerFactory()(initialState, {
            payload: {
                tickets: {
                    '123': {
                        id: '123',
                        name: 'General Admission',
                    },
                },
            },
        });

        expect(newState).toEqual({
            tickets: {
                '123': {
                    id: '123',
                    name: 'Ticket A',
                },
            },
        });
    });

    it('should not merge inner object properties', () => {
        let initialState = {
            tickets: {
                '123': {
                    id: '123',
                    name: 'Ticket A',
                    eventId: '1',
                    associations: ['456', '789'],
                },
            },
        };
        let action = {
            payload: {
                entities: {
                    tickets: {
                        '123': {
                            id: '123',
                            name: 'General Admission',
                            associations: ['456'],
                        },
                    },
                },
            },
        };
        let newState = entitiesReducerFactory()(initialState, action);

        expect(newState).toEqual({
            tickets: {
                '123': {
                    id: '123',
                    name: 'General Admission',
                    associations: ['456'],
                },
            },
        });
    });

    describe('user reducers', () => {
        const ticketReducer = jest.fn((state = {}) => state);
        const entitiesReducer = entitiesReducerFactory({tickets: ticketReducer});

        it('should be passed action', () => {
            let initialState = {
                tickets: {
                    '123': {
                        id: '123',
                        name: 'Ticket A',
                    },
                },
            };
            let action = {
                type: REMOVE_TICKET,
                payload: {
                    results: ['123'],
                },
            };

            entitiesReducer(initialState, action);
    
            expect(ticketReducer).toBeCalled();
            expect(ticketReducer).lastCalledWith(expect.any(Object), action);
        });


        it('should be passed updated state', () => {
            let initialState = {};
            let action = {
                type: UPDATE_TICKET,
                payload: {
                    entities: {
                        tickets: {
                            '123': {
                                id: '123',
                                name: 'General Admission',
                            },
                        },
                    },
                },
            };

            entitiesReducer(initialState, action);
    
            expect(ticketReducer).toBeCalled();
            expect(ticketReducer).lastCalledWith({
                '123': {
                    id: '123',
                    name: 'General Admission',
                },
            }, expect.any(Object));
        });
    });
});
