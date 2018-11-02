import moment from 'js-utils/moment';
import {ASSOCIATION_STATUS} from '../constants';

const TIMEZONE = 'America/Chicago';
const NEAR_FUTURE_TIME = moment().add(1, 'days');
const FAR_FUTURE_TIME = moment().add(30, 'days');
const PAST_TIME = moment().subtract(10, 'days');

export const NORMALIZED_EVENTS = {
    '123': {
        id: '123',
        name: {text: 'Event A'},
        ticketClasses: ['1', '2'],
        start: {
            local: FAR_FUTURE_TIME.format(),
            timezone: TIMEZONE,
            utc: FAR_FUTURE_TIME.utc().format(),
        },
    },
    '456': {
        id: '456',
        name: {text: 'Event B'},
        ticketClasses: ['3'],
        start: {
            local: NEAR_FUTURE_TIME.format(),
            timezone: TIMEZONE,
            utc: FAR_FUTURE_TIME.utc().format(),
        },
    },
};

export const EVENTS = Object.values(NORMALIZED_EVENTS);

export const NORMALIZED_TICKETS = {
    '1': {
        id: '1', 
        name: 'VIP',
        cost: {
            display: '$1,000.00',
        },
        eventId: '123',
        salesEnd: NEAR_FUTURE_TIME,
        salesStart: PAST_TIME,
    },
    '2': {
        id: '2',
        eventId: '123',
        name: 'General Admission',
        donation: true,
        salesEnd: FAR_FUTURE_TIME,
        salesStart: NEAR_FUTURE_TIME,
    },
    '3': {
        id: '3',
        eventId: '456',
        name: 'Ticket #2',
        free: true,
        salesEnd: NEAR_FUTURE_TIME,
        salesStart: PAST_TIME,
    },
};

export const TICKET = NORMALIZED_TICKETS['1'];
export const EVENT = {
    ...NORMALIZED_EVENTS['123'],
    ticketClasses: [
        NORMALIZED_TICKETS['1'],
        NORMALIZED_TICKETS['2'],
    ],
    allTicketIds: ['1', '2'],
};

export const TICKET_ASSOCIATION = {
    id: '999',
    masterTicketId: '1',
    childEventId: '456',
    childTicketId: '3',
    status: ASSOCIATION_STATUS.ACTIVE,
};
