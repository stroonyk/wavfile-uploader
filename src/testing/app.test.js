import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';
import { labels } from '../services/wavFileUtils';

/*
 * This tests to make sure our App is there
 */
describe('Make sure our App is there', () => {
    test('renders app wav-container class', () => {
        const { container } = render(<App />);

        // test our classes are on the page
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.getElementsByClassName('App').length).toBe(1);
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.getElementsByClassName('wav-container').length).toBe(
            1,
        );
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.getElementsByClassName('wav-upload').length).toBe(1);

        // test our header and drag labels are on the page
        let regex = new RegExp(labels.wavheader, 'i');
        const wavText = screen.getByText(regex);
        expect(wavText).toBeInTheDocument();

        regex = new RegExp(labels.drag, 'i');
        const dragText = screen.getByText(regex);
        expect(dragText).toBeInTheDocument();
    });
});
