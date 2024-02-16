import { readFileSync, writeFileSync } from 'fs';
import http from 'http';
import https from 'https';
import { parse } from 'url';

// Check command line arguments
if (process.argv.length !== 3) {
    console.log('Usage: node urls.js urls.txt');
    process.exit(1);
}

// Read the file
const filename = process.argv[2];
let urls;
try {
    urls = readFileSync(filename, 'utf8').split('\n');
} catch (err) {
    console.error(`Error reading file ${filename}: ${err.message}`);
    process.exit(1);
}

// Function to handle http(s) requests
function getAndWrite(urlString) {
    const urlObject = parse(urlString);
    const httpModule = urlObject.protocol === 'http:' ? http : https;

    httpModule.get(urlString, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                writeFileSync(urlObject.hostname, data);
            } catch (err) {
                console.error(`Error writing to file ${urlObject.hostname}: ${err.message}`);
            }
        });
    }).on('error', (err) => {
        console.error(`Error downloading URL ${urlString}: ${err.message}`);
    });
}

// Process each URL
urls.forEach((urlString) => {
    if (urlString.trim() !== '') {
        getAndWrite(urlString);
    }
});
