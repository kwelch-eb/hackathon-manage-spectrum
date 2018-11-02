import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DynamicDataTable from 'eventbrite_design_system/dynamicDataTable/DynamicDataTable';
import EmptyState from 'eventbrite_design_system/emptyState/EmptyState';
import LoadingOverlay from 'eventbrite_design_system/loadingOverlay/LoadingOverlay';
import { LOCALIZED_TEXT } from '../constants';

const COLUMNS = [
  {
    fieldName: 'name',
    fieldLabel: LOCALIZED_TEXT.landing.nameColumnTitle,
    isEditable: false,
    isSortable: true,
    isFilterable: true,
  },
  {
    fieldName: 'associationsCount',
    fieldLabel: LOCALIZED_TEXT.landing.associationsCountColumnTitle,
    isEditable: false,
    isSortable: true,
    isFilterable: false,
    isClickable: true,
  },
];

export default class LandingPage extends PureComponent {
  static propTypes = {
    tickets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        associationsCount: PropTypes.number.isRequired,
      })
    ),
    initializeApp: PropTypes.func.isRequired,
    redirectToTicketCreation: PropTypes.func.isRequired,
    eventId: PropTypes.number.isRequired,
    eventGroupId: PropTypes.string.isRequired,
  };
  static defaultProps = {
    tickets: [],
  };
  state = {
    isLoading: true,
  };

  componentDidMount() {
    const { sdk, eventGroupId, eventId, initializeApp } = this.props;

    initializeApp(sdk, eventId, eventGroupId).then(() => {
      this.setState({ isLoading: false });
    });
  }

  _handleCreateNew = () => {
    this.props.redirectToTicketCreation(this.props.eventId);
  };

  _handleTableItemAction = (action, masterTicketId) => {
    if (action === 'click') {
      this.props.setMasterTicketId(masterTicketId);
      return;
    }
  };

  render() {
    const { tickets, match } = this.props;
    const { isLoading } = this.state;
    let displayComponent = (
      <EmptyState
        graphicType="ghost"
        description={LOCALIZED_TEXT.landing.noTickets}
        primaryType="link"
        primaryText={LOCALIZED_TEXT.landing.newTicketButtonText}
        onPrimaryAction={this._handleCreateNew}
      />
    );

    if (tickets.length) {
      displayComponent = (
        <DynamicDataTable
          items={tickets}
          columns={COLUMNS}
          showTextFilter={true}
          onItemAction={this._handleTableItemAction}
        />
      );
    }

    return (
      <div className="eds-l-mar-all-3">
        <h1 className="eds-text-hl">{LOCALIZED_TEXT.landing.title}</h1>
        {displayComponent}
        <LoadingOverlay size="large-thin" isShown={isLoading} />
      </div>
    );
  }
}
