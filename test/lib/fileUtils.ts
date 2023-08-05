import * as zlib from 'zlib';
import {readFile, writeFile} from 'fs/promises';

// function to compress and save a file to disk
export async function saveCompressedFile(filePath: string, data: string): Promise<void> {
	const compressedData = zlib.gzipSync(data);
	return writeFile(filePath, compressedData);
}

// function to read a compressed file from disk and decompress it
export async function readCompressedFile(filePath: string): Promise<string> {
	const buffer = await readFile(filePath);
	return zlib.gunzipSync(buffer).toString();
}
