import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    parseHeader,
    labels,
    acceptStyle,
    rejectStyle,
} from '../services/wavFileUtils';

/*
 *  Put a dropzone on the page. Parse a file and add it to state if it's a wav.
 *  The Dropzone shouldn't accept a file other than a wav.
 *  However.... Error handling is dealt with incase an non wav file manages to be
 *  dropped (by changing the extension of an non wav file for instance)
 *  Handle visual changes appropriately. There should be an element of interaction
 *  as the user hovers with a file and then drops. An error produced by a
 *  dodgy wav should let the user know.
 */
const DropZone = ({ fileDragged, dropped, fileAdded, fileError, error }) => {
    
    // save the function in a callback and parse the file
    const onDrop = useCallback(
        (acceptedFiles) => {
            acceptedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onabort = () => console.log('file reading was aborted');
                reader.onerror = () => console.log('file reading has failed');
                reader.onload = () => {
                    const headerData = reader.result.slice(0, 44);
                    const header = parseHeader(headerData);
                    if (header.format === 'WAVE') {
                        fileAdded(file, header);
                    } else {
                        fileError();
                    }
                };
                reader.readAsArrayBuffer(file);
            });
        },
        [fileAdded, fileError],
    );

    // using this for testing essentially
    const onDragEnter = useCallback(() => {
        fileDragged();
    }, [fileDragged]);

    // handy dropzone hooks
    const { getRootProps, isDragAccept, isDragReject, isDragActive } =
        useDropzone({ accept: { 'audio/wav': ['.wav'] }, onDrop, onDragEnter });

    // handy dropzone styles
    const style = useMemo(
        () => ({
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
            ...(error ? rejectStyle : {}),
        }),
        [isDragAccept, isDragReject, error],
    );

    // basic visual components
    const DragComponent = () => {
        return <div className="label">{labels.drag}</div>;
    };
    const ErrorComponent = () => {
        return <div className="label">{labels.error}</div>;
    };

    // basic style changes
    const dropstyle = dropped ? 'wav-uploaded' : 'wav-upload';
    const display = error ? ErrorComponent() : DragComponent();

    return (
        <>
            <div
                data-testid="dropinput"
                className={dropstyle}
                {...getRootProps({ style })}
            >
                <p>{labels.wavheader}</p>
                {isDragActive && isDragAccept ? (
                    <div className="label">{labels.drop}</div>
                ) : (
                    display
                )}
            </div>
        </>
    );
};
export default DropZone;
