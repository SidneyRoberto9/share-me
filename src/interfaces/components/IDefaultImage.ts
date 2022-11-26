import { StaticImageData } from 'next/image';

export type DefaultImageComponentProps = {
	src: string | StaticImageData;
	width: number;
	height: number;
	classContent?: string;
};
