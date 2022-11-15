import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface IDefaultImageComponentProps {
	src: string | StaticImageData;
	width: number;
	height: number;
	classContent?: string;
}

export const DefaultImage = ({
	src,
	width,
	height,
	classContent,
}: IDefaultImageComponentProps) => {
	return (
		<Image
			src={src}
			alt='image'
			placeholder='blur'
			blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
			className={classContent}
			quality={100}
			width={width}
			height={height}
			draggable={false}
		/>
	);
};
