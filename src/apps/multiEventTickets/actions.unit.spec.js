import {push} from 'react-router-redux';
import {
    initializeApp,
    updateTicketAssociations,
    openMasterTicketEdit,
    redirectToTicketCreation,
    navigateToLandingPage,
    LOAD_TICKETS_ASSOCIATIONS,
    LOAD_EVENTS
} from './actions';
import {
    getMockDispatchTools,
    stub
} from '../common/utils/test';
import * as api from './api';
import * as http from '../common/utils/http';


describe('initializeApp', () => {
    it('should dispatch load events action', () => {
        let {dispatch} = getMockDispatchTools();
        let getState = () => ({});

        stub(api, 'loadEventGroupWithTickets', () => Promise.resolve({}));

        return initializeApp('1', '555')(dispatch, getState)
            .then(() => {
                expect(api.loadEventGroupWithTickets).toHaveBeenCalledTimes(1);
                expect(api.loadEventGroupWithTickets).lastCalledWith('555');

                expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
                    type: LOAD_EVENTS,
                    payload: expect.any(Object),
                }));

                api.loadEventGroupWithTickets.mockRestore();
            });
    });

    it('should call load ticket association for each ticket in event', () => {
        let {dispatch} = getMockDispatchTools();
        let getState = () => ({});

        stub(api, 'loadTicketAssociations', () => Promise.resolve({}));
        stub(api, 'loadEventGroupWithTickets', () => Promise.resolve({
            entities: {
                ticketClasses: {
                    '123': {id: '123', eventId: '1'},
                    '456': {id: '456', eventId: '1'},
                    '789': {id: '789', eventId: '2'},
                },
            },
        }));

        return initializeApp('1', '555')(dispatch, getState)
            .then(() => {
                expect(api.loadTicketAssociations).toHaveBeenCalledWith('1', '123');
                expect(api.loadTicketAssociations).toHaveBeenCalledWith('1', '456');

                // ticket load, plus twice for associations
                expect(dispatch).toHaveBeenCalledTimes(3);

                expect(dispatch).toHaveBeenCalledWith({
                    type: LOAD_TICKETS_ASSOCIATIONS,
                    payload: expect.any(Object),
                });

                api.loadTicketAssociations.mockRestore();
                api.loadEventGroupWithTickets.mockRestore();
            });
    });
});

describe('updateTicketAssociations', () => {
    it('should dispatch load events action', () => {
        let {dispatch} = getMockDispatchTools();

        stub(api, 'postTicketAssociations', () => Promise.resolve({}));

        return updateTicketAssociations('123', '1', {'2': 'active'})(dispatch)
            .then(() => {
                expect(api.postTicketAssociations).toHaveBeenCalled();
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).lastCalledWith(expect.objectContaining({
                    type: LOAD_TICKETS_ASSOCIATIONS,
                    payload: expect.any(Object),
                }));

                api.postTicketAssociations.mockRestore();
            });
    });
});

describe('openMasterTicketEdit', () => {
    it('should dispatch react router push action', () => {
        let results = openMasterTicketEdit('1', '123');

        expect(results).toEqual(push('/myevent/1/multi-event-tickets/123'));
    });
});

describe('navigateToLandingPage', () => {
    it('should dispatch react router push action', () => {
        let results = navigateToLandingPage('1');

        expect(results).toEqual(push('/myevent/1/multi-event-tickets/'));
    });
});

describe('redirectToTicketCreation', () => {
    let dispatch;

    beforeEach(() => {
        ({dispatch} = getMockDispatchTools());

    });

    it('should update window location to `/edit` for classic events', () => {
        let setWindowLocation = stub(http, 'setWindowLocation');
        let getState = () => ({
            featureFlags: {isCoyoteEvent: false},
        });

        redirectToTicketCreation('123456')(dispatch, getState);

        expect(setWindowLocation).toHaveBeenCalled();
        expect(setWindowLocation).lastCalledWith('/edit?eid=123456#create_tickets_wrapper');
    });

    it('should update window location to `/manage/events/` for beta events', () => {
        let setWindowLocation = stub(http, 'setWindowLocation');
        let getState = () => ({
            featureFlags: {isCoyoteEvent: true},
        });

        redirectToTicketCreation('123456')(dispatch, getState);

        expect(setWindowLocation).toHaveBeenCalled();
        expect(setWindowLocation).lastCalledWith('/manage/events/123456/tickets');
    });
});
