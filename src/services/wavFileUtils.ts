/*
 *   Provide a little typescript to our data
 */
type HeaderType = {
    chunkID: string;
    chunkSize: number;
    format: string;
    subchunk1ID: string;
    audioFormat: number;
    numChannels: number;
    sampleRate: number;
    byteRate: number;
    blockAlign: number;
    bitsPerSample: number;
};

/*
 * Boilerplate getting info
 */
const parseHeader = (headerData: ArrayBuffer) => {
    const dataView = new DataView(headerData);
    let header = {} as HeaderType;

    header.chunkID = String.fromCharCode(
        dataView.getUint8(0),
        dataView.getUint8(1),
        dataView.getUint8(2),
        dataView.getUint8(3),
    );
    header.chunkSize = dataView.getUint32(4, true);
    header.format = String.fromCharCode(
        dataView.getUint8(8),
        dataView.getUint8(9),
        dataView.getUint8(10),
        dataView.getUint8(11),
    );
    header.subchunk1ID = String.fromCharCode(
        dataView.getUint8(12),
        dataView.getUint8(13),
        dataView.getUint8(14),
        dataView.getUint8(15),
    );
    header.audioFormat = dataView.getUint16(20, true);
    header.numChannels = dataView.getUint16(22, true);
    header.sampleRate = dataView.getUint32(24, true);
    header.byteRate = dataView.getUint32(28, true);
    header.blockAlign = dataView.getUint16(32, true);
    header.bitsPerSample = dataView.getUint16(34, true);

    return header;
};
export { parseHeader };

/*
 *   Detail labels
 */
const headerInfo = [
    { id: 'chunkID', label: 'Chunk Id' },
    { id: 'chunkSize', label: 'Chunk Size' },
    { id: 'format', label: 'Format' },
    { id: 'subchunk1ID', label: 'Sub Chunk Id' },
    { id: 'audioFormat', label: 'Audio Format' },
    { id: 'numChannels', label: 'Num Channels' },
    { id: 'sampleRate', label: 'Sample Rate' },
    { id: 'byteRate', label: 'Byte Rate' },
    { id: 'blockAlign', label: 'Block Align' },
    { id: 'bitsPerSample', label: 'Bits Per Sample' },
];
export { headerInfo };

/*
 *   UI labels
 */
const labels = {
    wavheader: 'Wav File Extractor',
    drag: 'Drag File',
    drop: 'Drop File',
    results: 'Results',
    header: 'header',
    value: 'value',
    error: 'File Error. Unsupported format!',
};
export { labels };

/*
 *  Dropzone stuff
 */
const acceptStyle = {
    backgroundColor: '#222633',
    fontWeight: 'bold',
};
export { acceptStyle };

const rejectStyle = {
    borderColor: '#ff1744',
};
export { rejectStyle };
