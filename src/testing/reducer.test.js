import '@testing-library/jest-dom';
import { WavFileMock } from './WavFileMock';
import { testHeader } from './utils';
import wavReducer, {
    wavActionFactory,
    wavInitialState,
} from '../store/wavReducer';

/*
 * Testing the reducer state funcionality.
 */
describe('Reducer Testing', () => {
    test('adding  a file and header to the reducer', () => {
        // create our action
        const action = wavActionFactory.createAddFileAction({
            file: WavFileMock,
            header: testHeader,
        });

        // set our expected state
        const expectedState = {
            file: WavFileMock,
            fileDropped: true,
            header: testHeader,
            error: false,
        };

        // run the action through the reducer with it's initial falsy state
        const newState = wavReducer(wavInitialState, action);

        // expect our new state to have the file added successfully et al.
        expect(newState).toStrictEqual(expectedState);
    });

    test('fileError in the reducer', () => {
        // create our action
        const action = wavActionFactory.createFileErrorAction();

        // set our mostly truthy states
        const state = {
            file: WavFileMock,
            fileDropped: true,
            header: testHeader,
            error: false,
        };

        // when we execute the error action, we want initialization and error to be true.
        const expectedState = { ...wavInitialState, error: true };

        // run the action
        const newState = wavReducer(state, action);

        // expect initialization and error to be true
        expect(newState).toStrictEqual(expectedState);
    });
});
