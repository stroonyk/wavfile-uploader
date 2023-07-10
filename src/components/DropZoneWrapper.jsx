import React, { useContext } from 'react';
import wavContext from '../store/wav-context';
import DropZone from './DropZone';

/*
 *   Provide our dropzone with necessary info.
 */
const DropZoneWrapper = () => {
    const wavCtx = useContext(wavContext);
    return (
        <>
            <DropZone
                fileDragged={wavCtx.onFileDragged}
                fileAdded={wavCtx.onFileAdded}
                fileError={wavCtx.onFileError}
                dropped={wavCtx.fileDropped}
                error={wavCtx.error}
            />
        </>
    );
};

export default DropZoneWrapper;
