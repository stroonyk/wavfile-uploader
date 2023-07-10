import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropZoneWrapper from '../components/DropZoneWrapper';
import WavContext from '../store/wav-context';
import { wavInitialState } from '../store/wavReducer';
import { labels } from '../services/wavFileUtils';
import { mockDataFiles } from './utils';

/*
 * this is an example of testing our context provider with our components
 */
describe('DropZone Wrapper Label Testing', () => {
    test('render wavInitialStat', () => {
        const { container } = render(
            <WavContext.Provider value={wavInitialState}>
                <DropZoneWrapper />
            </WavContext.Provider>,
        );
        expect(
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            container.getElementsByClassName('wav-upload').length,
        ).toBe(1);
    });

    test('render fileDropped', () => {
        const data = { fileDropped: true };
        const { container } = render(
            <WavContext.Provider value={data}>
                <DropZoneWrapper />
            </WavContext.Provider>,
        );
        expect(
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            container.getElementsByClassName('wav-uploaded').length,
        ).toBe(1);
    });

    test('render error label', () => {
        const data = { error: true };
        render(
            <WavContext.Provider value={data}>
                <DropZoneWrapper />
            </WavContext.Provider>,
        );
        const regex = new RegExp(labels.error, 'i');
        const results = screen.queryByText(regex);
        expect(results).toBeInTheDocument();
    });
});
/*
 * This tests dragging and dropping onto the dropzone.
 * This should test that it's alive and prenset and fires the correct callbacks.
 */
describe('DropZone Wrapper UI functionality Testing', () => {
    test('onAddFile, onFileEnter, onFileError testers', async () => {
        // get a good and bad file
        const files = mockDataFiles();

        // these are our mocked provider functions. we want them to be called
        const data = {
            onFileAdded: jest.fn(),
            onFileDragged: jest.fn(),
            onFileError: jest.fn(),
        };

        // render our wrapper with context
        render(
            <WavContext.Provider value={data}>
                <DropZoneWrapper />
            </WavContext.Provider>,
        );

        // get our input and fire our events
        const dropZoneEl = screen.queryByTestId('dropinput');

        fireEvent.drop(dropZoneEl, files);
        await waitFor(() => expect(data.onFileAdded).toHaveBeenCalled());

        await waitFor(() => expect(data.onFileError).toHaveBeenCalled());

        fireEvent.dragEnter(dropZoneEl, files);
        await waitFor(() => expect(data.onFileDragged).toHaveBeenCalled());
    });
});
