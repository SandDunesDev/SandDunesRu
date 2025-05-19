import path from 'path';

export function stripHash(filename) {
    const ext  = path.extname(filename);
    const name = path.basename(filename, ext);

    const originalName = name.replace(/\.[0-9a-f]{8,}$/, '');

    return `${originalName}${ext}`;
}