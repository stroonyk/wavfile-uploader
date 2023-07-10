import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Landing from '../pages/Landing';
import { testHeader } from './utils';
import WavContext from '../store/wav-context';
import { wavInitialState } from '../store/wavReducer';
import { labels } from '../services/wavFileUtils';

/*
 * Make sure our landing page is up and running
 */
describe('Landing Component Testing', () => {
    test('renders corrently with and without our context provider data', () => {
        render(
            <WavContext.Provider value={wavInitialState}>
                <Landing />
            </WavContext.Provider>,
        );
        let regex = new RegExp(labels.drag, 'i');
        let results = screen.queryByText(regex);
        expect(results).toBeInTheDocument();

        regex = new RegExp(labels.results, 'i');
        results = screen.queryByText(regex);
        expect(results).not.toBeInTheDocument();

        const header = { header: testHeader };
        render(
            <WavContext.Provider value={header}>
                <Landing />
            </WavContext.Provider>,
        );

        results = screen.queryByText(regex);
        expect(results).toBeInTheDocument();
    });
});
