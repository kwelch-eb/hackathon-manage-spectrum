import React from 'react';
import {Route, IndexRoute} from 'react-router';

import ConnectedLandingPage from './containers/ConnectedLandingPage';
import ConnectedAssociationPage from './containers/ConnectedAssociationPage';
import {BASE_URL} from './constants';

const getRoutes = ({eventGroupId}) => (
    <Route path={BASE_URL}>
        <IndexRoute component={ConnectedLandingPage} eventGroupId={eventGroupId} />
        <Route path=":masterTicketId" component={ConnectedAssociationPage} eventGroupId={eventGroupId} />
    </Route>
);

export default getRoutes;
