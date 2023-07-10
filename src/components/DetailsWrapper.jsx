import React, { useContext } from 'react';
import wavContext from '../store/wav-context';
import Details from './Details';

/*
 *   Provide our Details component with our header info
 */
const WavDetails = () => {
    const wavCtx = useContext(wavContext);
    return <>{wavCtx.header && <Details header={wavCtx.header} />}</>;
};
export default WavDetails;
