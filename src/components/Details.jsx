import React from 'react';
import { headerInfo, labels } from '../services/wavFileUtils';

/*
 *   Show the details of the header if it exists
 */
const Details = ({ header }) => {
    return (
        header && (
            <>
                <div className="wav-details">
                    <h2>{labels.results}</h2>
                    <ul>
                        <li>
                            <div>{labels.header}</div>
                            <div>{labels.value}</div>
                        </li>
                        {headerInfo.map(({ id, label }) => (
                            <li key={id}>
                                <div className="label">{label}</div>
                                <div data-testid={id} className="results">
                                    {header[id]}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        )
    );
};
export default Details;
