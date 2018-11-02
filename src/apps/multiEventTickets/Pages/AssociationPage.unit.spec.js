import {calculateChangesToSave} from './AssociationPage';

describe('calculateChangesToSave', () => {
    it('should return an object', () => {
        let result = calculateChangesToSave();

        expect(result).toEqual({});
    });

    it('should return only updated values', () => {
        let oldState = {
            '1': 'active',
            '2': 'inactive',
        };
        let newState = {
            '1': 'inactive',
            '2': 'inactive',
        };
        let result = calculateChangesToSave(oldState, newState);

        expect(result).toEqual({
            '1': 'inactive',
        });
    });

    it('should return active values if they are not in old state', () => {
        let oldState = {
        };
        let newState = {
            '1': 'active',
        };
        let result = calculateChangesToSave(oldState, newState);

        expect(result).toEqual({
            '1': 'active',
        });
    });

    it('should not return inactive values if they are not in old state', () => {
        let oldState = {
        };
        let newState = {
            '1': 'inactive',
        };
        let result = calculateChangesToSave(oldState, newState);

        expect(result).toEqual({});
    });

    it('should return empty object if newState is empty', () => {
        let oldState = {
            '1': 'active',
        };
        let newState = {
        };
        let result = calculateChangesToSave(oldState, newState);

        expect(result).toEqual({});
    });


    it('should handle inactiving all keys', () => {
        let oldState = {
            '1': 'active',
            '2': 'active',
        };
        let newState = {
            '1': 'inactive',
            '2': 'inactive',
        };
        let result = calculateChangesToSave(oldState, newState);

        expect(result).toEqual({
            '1': 'inactive',
            '2': 'inactive',
        });
    });
});
