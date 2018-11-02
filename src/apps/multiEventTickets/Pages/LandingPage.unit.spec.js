import React from 'react';
import {shallow} from 'enzyme';
import DynamicDataTable from 'eventbrite_design_system/dynamicDataTable/DynamicDataTable';
import EmptyState from 'eventbrite_design_system/emptyState/EmptyState';
import LoadingOverlay from 'eventbrite_design_system/loadingOverlay/LoadingOverlay';
import LandingPage from './LandingPage';

const PARAMS = {
    eventId: '1',
    masterTicketId: '123',
};

const ROUTE = {eventGroupId: '555'};

const TICKET_CLASSES = [
    {id: '123', name: 'Ticket A', associationsCount: 0},
    {id: '456', name: 'Ticket B', associationsCount: 2},
];

describe('<LandingPage />', () => {
    it('should render a page title', () => {
        let wrapper = shallow(
            <LandingPage
                initializeApp={jest.fn(() => Promise.resolve({}))}
                redirectToTicketCreation={jest.fn()}
                openMasterTicketEdit={jest.fn()}
                route={ROUTE}
                params={PARAMS}
            />
        );

        expect(wrapper.find('h1')).toHaveText('Multi Event Tickets');
    });
    
    it('should render EmptyState when no tickets are loaded', () => {
        let wrapper = shallow(
            <LandingPage
                initializeApp={jest.fn(() => Promise.resolve({}))}
                redirectToTicketCreation={jest.fn()}
                openMasterTicketEdit={jest.fn()}
                route={ROUTE}
                params={PARAMS}
            />
        );

        expect(wrapper.find(EmptyState)).toBePresent();
        expect(wrapper.find(DynamicDataTable)).not.toBePresent();
    });

    it('should render DynamicDataTable when are loaded', () => {
        let wrapper = shallow(
            <LandingPage
                initializeApp={jest.fn(() => Promise.resolve({}))}
                redirectToTicketCreation={jest.fn()}
                openMasterTicketEdit={jest.fn()}
                route={ROUTE}
                params={PARAMS}
                tickets={TICKET_CLASSES}
            />
        );

        expect(wrapper.find(DynamicDataTable)).toBePresent();
        expect(wrapper.find(EmptyState)).not.toBePresent();
    });

    it('should render LoadingOverlay with isShown set to loading state', () => {
        let wrapper = shallow(
            <LandingPage
                initializeApp={jest.fn(() => Promise.resolve({}))}
                redirectToTicketCreation={jest.fn()}
                openMasterTicketEdit={jest.fn()}
                route={ROUTE}
                params={PARAMS}
            />
        );

        expect(wrapper.find(LoadingOverlay)).toHaveProp('isShown', true);
        
        wrapper.setState({isLoading: false});
        wrapper.update();

        expect(wrapper.find(LoadingOverlay)).toHaveProp('isShown', false);
    });

    it('should load tickets on mount', () => {
        let mockLoadTickets = jest.fn(() => Promise.resolve({}));

        shallow(
            <LandingPage
                initializeApp={mockLoadTickets}
                redirectToTicketCreation={jest.fn()}
                openMasterTicketEdit={jest.fn()}
                route={ROUTE}
                params={PARAMS}
            />
        );
        
        expect(mockLoadTickets).toHaveBeenCalled();
        expect(mockLoadTickets).lastCalledWith('1', '555');
    });

    it('should call redirectToTicketCreation when empty state action is clicked', () => {
        let mockRedirectToTicketCreation = jest.fn();
        
        let wrapper = shallow(
            <LandingPage
                initializeApp={jest.fn(() => Promise.resolve({}))}
                redirectToTicketCreation={mockRedirectToTicketCreation}
                openMasterTicketEdit={jest.fn()}
                route={ROUTE}
                params={PARAMS}
            />
        );

        wrapper.find(EmptyState).simulate('primaryAction');

        expect(mockRedirectToTicketCreation).toHaveBeenCalled();
        expect(mockRedirectToTicketCreation).lastCalledWith('1');
    });

    it('should call openMasterTicketEdit when dyanamic data table item action is called with type click', () => {
        let mockOpenMasterTicketEdit = jest.fn();
        
        let wrapper = shallow(
            <LandingPage
                initializeApp={jest.fn(() => Promise.resolve({}))}
                redirectToTicketCreation={jest.fn()}
                openMasterTicketEdit={mockOpenMasterTicketEdit}
                route={ROUTE}
                params={PARAMS}
                tickets={TICKET_CLASSES}
            />
        );

        wrapper.find(DynamicDataTable).simulate('itemAction', 'click', '123');

        expect(mockOpenMasterTicketEdit).toHaveBeenCalled();
        expect(mockOpenMasterTicketEdit).lastCalledWith('1', '123');
    });
});
