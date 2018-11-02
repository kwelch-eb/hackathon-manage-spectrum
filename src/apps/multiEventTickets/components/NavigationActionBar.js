import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import gettext from 'js-utils/gettext';
import Button from 'eventbrite_design_system/button/Button';
import {
    TYPE_BUTTON,
    TYPE_SUBMIT,
    STYLE_FILL
} from 'eventbrite_design_system/button/constants';

export default class NavigationActionBar extends PureComponent {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
        isSaveDisabled: PropTypes.bool,
    }
    static defaultProps = {
        isSaveDisabled: false,
    };

    render() {
        let {
            isSaveDisabled,
            onSave,
            onBack,
        } = this.props;
        
        return (
            <div className="eds-g-group eds-l-pad-all-4">
                <div className="eds-g-cell">
                    <Button
                        type={TYPE_BUTTON}
                        onClick={onBack}
                        data-spec="met-back-btn"
                    >
                        {gettext('Back')}
                    </Button>
                </div>
                <div className="eds-g-cell">
                    <Button
                        type={TYPE_SUBMIT}
                        style={STYLE_FILL}
                        disabled={isSaveDisabled}
                        onClick={onSave}
                        data-spec="met-save-btn"
                    >
                        {gettext('Submit')}
                    </Button>
                </div>
            </div>
        );
    }
}
