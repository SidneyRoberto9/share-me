import Image from 'next/image';
import React from 'react';

import { DefaultImageComponentProps } from '../interfaces/components/IDefaultImage';

export const DefaultImage = ({
	src,
	width,
	height,
	classContent,
}: DefaultImageComponentProps) => {
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
