import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { parseHeader, headerInfo, labels } from '../services/wavFileUtils';
import Details from '../components/Details';
import { WavFileMock } from './WavFileMock';
import { blobToArrayBuffer, testHeader } from './utils';

/*
 * this is an example of testing using props
 */
describe('Details Component Testing', () => {
    test('renders the details area with header', () => {
        const { container } = render(<Details header={testHeader} />);

        // test our Results label is present
        let regex = new RegExp(labels.results, 'i');
        let results = screen.queryByText(regex);
        expect(results).toBeInTheDocument();

        // test our Header label is present
        regex = new RegExp(labels.header, 'i');
        results = screen.queryByText(regex);
        expect(results).toBeInTheDocument();

        // test our Value label is present
        regex = new RegExp(labels.value, 'i');
        results = screen.queryByText(regex);
        expect(results).toBeInTheDocument();

        // test all our wav heaver labels are on the page
        headerInfo.map((item) => {
            let regExp = new RegExp(item.label, 'i');
            let itemText = screen.queryAllByText(regExp);
            expect(itemText[0]).toBeInTheDocument();
            return true;
        });

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.getElementsByClassName('results').length).toBe(10);
    });

    /*
     * this is testing our parseHeader and values column
     */
    test('renders all the details from a wav blob, testing the parseHeader and actual results', async () => {
        // get an array of our blob
        const arrayBuffer = await blobToArrayBuffer(WavFileMock);

        // get our header from it
        let header = parseHeader(arrayBuffer);

        // now render the details component with the header
        render(<Details header={header} />);

        // now test that the screen and test values are the same
        headerInfo.map((item) => {
            let inputEl = screen.queryByTestId(item.id);
            let screenValue = inputEl.innerHTML;
            let testValue = testHeader[item.id];
            expect(screenValue).toEqual(testValue);
            return true;
        });
    });
});
