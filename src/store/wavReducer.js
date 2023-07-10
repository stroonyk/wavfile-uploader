/*
 *  Useful reducer. Put all our stateful logic here.
 *
 *
 *
 *
 *   Setup our reducer with hooks into it's core
 */
const ACTION_TYPE = {
    ADD_FILE: 'ADD_FILE',
    FILE_ERROR: 'FILE_ERROR',
    FILE_DRAGGED: 'FILE_DRAGGED',
};
export const wavActionFactory = {
    createAddFileAction: (data) => {
        return {
            type: ACTION_TYPE.ADD_FILE,
            payload: data,
        };
    },
    createFileErrorAction: () => {
        return {
            type: ACTION_TYPE.FILE_ERROR,
            payload: {},
        };
    },
    createFileDraggedAction: () => {
        return {
            type: ACTION_TYPE.FILE_DRAGGED,
            payload: {},
        };
    },
};

/*
 *   Set our initial state
 */
export const wavInitialState = {
    header: null,
    fileDropped: false,
    file: null,
    error: false,
};

/*
 *   Adjust our state
 *   1. Add file will save the file, header and booleans appropriately.
 *   2. File error should never really happen but lets just initialize ourselves and... error!
 */
const wavReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_FILE: {
            const { file, header } = action.payload;
            return {
                ...state,
                file,
                header,
                fileDropped: true,
                error: false,
            };
        }
        case ACTION_TYPE.FILE_ERROR: {
            return {
                ...state,
                ...wavInitialState,
                error: true,
            };
        }
        case ACTION_TYPE.FILE_DRAGGED: {
            return {
                ...state,
            };
        }
        default:
            throw new Error('wav reducer: unknown action type');
    }
};

export default wavReducer;
