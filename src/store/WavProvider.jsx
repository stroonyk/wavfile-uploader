import { useReducer } from 'react';
import WavContext from './wav-context';
import wavReducer, { wavActionFactory, wavInitialState } from './wavReducer';

/*
 *   Useful provider for our application.
 *   Give our app state and hooks.
 */
const WavProvider = ({ children }) => {
    const [state, wavDispatch] = useReducer(wavReducer, wavInitialState);

    // expose our handlers in cotext below
    const fileAddedHandler = (file, header) => {
        const action = wavActionFactory.createAddFileAction({
            file: file,
            header: header,
        });
        wavDispatch(action);
    };

    const fileErrorHandler = () => {
        const action = wavActionFactory.createFileErrorAction();
        wavDispatch(action);
    };

    const fileDraggedHandler = () => {
        const action = wavActionFactory.createFileDraggedAction();
        wavDispatch(action);
    };

    const wavContext = {
        ...state,
        onFileAdded: fileAddedHandler,
        onFileError: fileErrorHandler,
        onFileDragged: fileDraggedHandler,
    };

    return (
        <WavContext.Provider value={wavContext}>{children}</WavContext.Provider>
    );
};

export default WavProvider;
