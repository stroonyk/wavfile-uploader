import { WavFileMock } from './WavFileMock';

// good thing our mock data is the same :)
const testHeader = {
    chunkID: 'RIFF',
    chunkSize: '96015',
    format: 'WAVE',
    subchunk1ID: 'fmt ',
    audioFormat: '1',
    bitsPerSample: '16',
    blockAlign: '4',
    byteRate: '96000',
    numChannels: '1',
    sampleRate: '48000',
};
export { testHeader };

// do blob buffer stuff
const blobToArrayBuffer = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(new Error('Error reading Blob as ArrayBuffer.'));
        };
        reader.readAsArrayBuffer(blob);
    });
};
export { blobToArrayBuffer };

// bad file
const mockWavWErrorFile = new File(
    ['this is a load of test for our error handler'],
    'wav.wav',
    {
        type: 'audio/wav',
    },
);

// this is a good file
const mockWavfile = new File([WavFileMock], 'wav.wav', {
    type: 'audio/wav',
});

// format them
const mockData = (files) => {
    return {
        dataTransfer: {
            files,
            items: files.map((file) => ({
                kind: 'file',
                type: file.type,
                getAsFile: () => file,
            })),
            types: ['Files'],
        },
    };
};

// return some interesting files
const mockDataFiles = () => {
    return mockData([mockWavfile, mockWavWErrorFile]);
};
export { mockDataFiles };
