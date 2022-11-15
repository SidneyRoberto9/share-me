import formidable from 'formidable';
import { mkdir, stat } from 'fs/promises';
import mime from 'mime';
import { join } from 'path';

import type { NextApiRequest } from 'next';
export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
	req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
	return await new Promise(async (resolve, reject) => {
		const uploadDir = join(process.cwd(), `public/uploads`);

		try {
			await stat(uploadDir);
		} catch (e: any) {
			if (e.code === 'ENOENT') {
				await mkdir(uploadDir, { recursive: true });
			} else {
				console.error(e);
				reject(e);
				return;
			}
		}

		let filename = ''; //  To avoid duplicate upload
		const form = formidable({
			uploadDir,
			filename: (_name, _ext, part) => {
				if (filename !== '') {
					return filename;
				}

				const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
				filename = `${part.name || 'unknown'}-${uniqueSuffix}.${
					mime.getExtension(part.mimetype || '') || 'unknown'
				}`;
				return filename;
			},
			filter: (part) => {
				return (
					part.name === 'media' && (part.mimetype?.includes('image') || false)
				);
			},
		});

		form.parse(req, function (err, fields, files) {
			if (err) reject(err);
			else resolve({ fields, files });
		});
	});
};
