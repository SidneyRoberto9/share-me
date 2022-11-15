import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import { Layout, Loading, Spinner } from '../../components';
import { useAccount } from '../../server/useAccount';
import { useUploadPost } from '../../server/usePost';
import { validateAuthentication } from '../../utils/validateAuthentication';

const Add = () => {
	const [title, setTitle] = useState('');
	const [about, setAbout] = useState('');
	const [loading, setLoading] = useState(false);
	const [destination, setDestination] = useState();
	const [fields, setFields] = useState(false);
	const [category, setCategory] = useState();
	const [imageAsset, setImageAsset] = useState();
	const [wrongImageType, setWrongImageType] = useState(false);

	const router = useRouter();

	const { data } = useSession();
	const { user, isLoading, isError } = useAccount(data?.user.email);
	const imageTypes = [
		'image/png',
		'image/svg',
		'image/jpeg',
		'image/jpg',
		'image/gif',
		'image/tiff',
	];

	const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const selectedFile = event.target.files[0];

		if (imageTypes.includes(selectedFile.type)) {
			setWrongImageType(false);
			setLoading(true);

			const formData = new FormData();
			formData.append('media', selectedFile);
			const { data } = await useUploadPost(formData);
			console.log(data.data.url);
		} else {
			setWrongImageType(true);
		}
	};

	if (isLoading) return <Loading />;

	return (
		<Layout>
			<div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
				{fields && (
					<p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>
						Please Fill all the fields.
					</p>
				)}
				<div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
					<div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
						<div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
							{loading && <Spinner />}
							{wrongImageType && <p>Wrong image Type!!</p>}
							{!imageAsset ? (
								<label>
									<div className='flex flex-col items-center justify-center w-full'>
										<div className='flex flex-col justify-center items-center'>
											<p className='font-bold text-2xl'>
												<AiOutlineCloudUpload className='' />
											</p>

											<p className='text-lg'>Click to upload</p>
										</div>
										<p className='mt-32 text-gray-400'>
											Use high-quality JPG,SVG,PBG,GIF less then 20 MB
										</p>
									</div>
									<input
										type='file'
										name='upload-image'
										className='w-0 h-0'
										onChange={uploadImage}
									/>
								</label>
							) : (
								<p>Something else</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateAuthentication(context, () => {
		return {
			props: {},
		};
	});
};

export default Add;
