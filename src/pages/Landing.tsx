import React from 'react';
import DropZoneWrapper from '../components/DropZoneWrapper';
import DetailsWrapper from '../components/DetailsWrapper';

/*
 *   Our landing page.
 *   Wrap our wrappers in a provider. keeps our components free from
 *   prop drilling.
 */
const WavUpload = () => {
    return (
        <>
            <div className="wav-container">
                <DropZoneWrapper />
                <DetailsWrapper />
            </div>
        </>
    );
};

export default WavUpload;
