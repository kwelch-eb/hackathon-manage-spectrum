import React from 'react';
import {shallow} from 'enzyme';
import {getSpecWrapper} from 'eventbrite_design_system/utils/unitTest';

import NavigationActionBar from './NavigationActionBar';

const generateComponent = (props, renderFn = shallow) => {
    let defaultProps = {
        isDirty: false,
        onSave: () => ({}),
        onBack: () => ({}),
    };

    return renderFn(
        <NavigationActionBar
            {...defaultProps}
            {...props}
        />
    );
};

describe('<NavigationActionBar />', () => {
    describe('Submit button', () => {
        it('should render a submit button that is disabled by default', () => {
            let wrapper = generateComponent();

            let submitButton = getSpecWrapper(wrapper, 'met-save-btn');

            expect(submitButton).toBePresent();
            expect(submitButton).toHaveProp('type', 'submit');
            expect(submitButton).toHaveProp('disabled', false);

            wrapper.unmount();
        });
        
        it('should enable the submit button when isDirty is true', () => {
            let wrapper = generateComponent({
                isSaveDisabled: true,
            });

            let submitButton = getSpecWrapper(wrapper, 'met-save-btn');

            expect(submitButton).toHaveProp('disabled', true);
            wrapper.unmount();
        });
        
        it('should call onSave when submit is clicked', () => {
            let mockSave = jest.fn();
            let wrapper = generateComponent({
                onSave: mockSave,
            });

            getSpecWrapper(wrapper, 'met-save-btn').simulate('click');

            expect(mockSave).toHaveBeenCalledTimes(1);
            wrapper.unmount();
        });
    });
    
    
    describe('Back button', () => {
        it('should render a back button', () => {
            let wrapper = generateComponent();

            let backButton = getSpecWrapper(wrapper, 'met-back-btn');

            expect(backButton).toBePresent();
            wrapper.unmount();
        });
        
        it('should call onBack when submit is clicked', () => {
            let mockBack = jest.fn();
            let wrapper = generateComponent({
                onBack: mockBack,
            });

            getSpecWrapper(wrapper, 'met-back-btn').simulate('click');

            expect(mockBack).toHaveBeenCalledTimes(1);
            wrapper.unmount();
        });
    });
});
