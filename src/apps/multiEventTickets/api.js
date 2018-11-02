import { Schema, arrayOf } from 'normalizr';
import urllib from 'url-lib';

import { transformUtil } from 'js-utils/transformation';

export const fetchAll = sdk => (url, dataKey, paginationType = 'page') => {
  const donePredicate = ({ page_number: pageNumber, page_count: pageCount }) =>
      pageNumber >= pageCount,
    initialPageId = 1;

  return new Promise((resolve, reject) => {
    const fetchNext = (nextPageId, existingObjects = []) => {
      const apiUrl = urllib.formatUrl(url, { [paginationType]: nextPageId });

      sdk
        .request(apiUrl)
        .then(({ pagination, ...response }) => {
          const objects = [...existingObjects, ...response[dataKey]];

          if (!pagination || donePredicate(pagination)) {
            return resolve({ objects });
          }

          let nextPage =
            paginationType === 'page'
              ? nextPageId + 1
              : pagination.continuation;

          return fetchNext(nextPage, objects);
        })
        .catch(reject);
    };

    fetchNext(initialPageId);
  });
};

const API_V3_BASE_URL = '/';

const TICKET_ASSOCIATION_SCHEMA = new Schema('ticketAssociations');
const TICKET_CLASS_SCHEMA = new Schema('ticketClasses');
const EVENT_SCHEMA = new Schema('events');

EVENT_SCHEMA.define({
  ticket_classes: arrayOf(TICKET_CLASS_SCHEMA),
});

const EVENT_FIELDS = [
  'name',
  'text',
  'start',
  'local',
  'timezone',
  'utc',
  'ticket_classes',
  'id',
];

const TICKET_FIELDS = [
  'event_id',
  'free',
  'donation',
  'hidden',
  'id',
  'on_sale_status',
  'name',
  'sales_start',
  'sales_end',
  'quantity_sold',
  'quantity_total',
  'cost',
  'display',
];

export const loadEventGroupWithTickets = sdk => eventGroupId =>
  fetchAll(sdk)(
    `${API_V3_BASE_URL}event_groups/${eventGroupId}/events/?expand=ticket_classes`,
    'events'
  ).then(({ objects }) =>
    transformUtil({
      fields: [...EVENT_FIELDS, ...TICKET_FIELDS],
      response: objects,
      schema: arrayOf(EVENT_SCHEMA),
      isWhiteList: true,
    })
  );

export const loadTicketAssociations = sdk => (eventId, ticketId) =>
  fetchAll(sdk)(
    `${API_V3_BASE_URL}events/${eventId}/ticket_classes/${ticketId}/associations/`,
    'ticket_associations'
  ).then(({ objects }) =>
    transformUtil({
      response: objects,
      schema: arrayOf(TICKET_ASSOCIATION_SCHEMA),
    })
  );

const _formatAssociationDataForAPI = associations =>
  Object.keys(associations).map(childTicketId => {
    let status = associations[childTicketId];

    return {
      status,
      child_ticket_id: childTicketId,
    };
  });

export const postTicketAssociations = sdk => (
  eventId,
  masterTicketId,
  associations
) =>
  sdk
    .request(
      `${API_V3_BASE_URL}events/${eventId}/ticket_classes/${masterTicketId}/associations/`,
      {
        method: 'POST',
        body: JSON.stringify({
          child_tickets_with_status: _formatAssociationDataForAPI(associations),
        }),
      }
    )
    .then(response =>
      transformUtil({
        response: response['ticket_associations'],
        schema: arrayOf(TICKET_ASSOCIATION_SCHEMA),
      })
    );
