import React, { ChangeEvent, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '../components';
import { useAccount } from '../context/useAccount';
import { usePost } from '../context/usePost';
import { categories } from '../utils/category.data';

export const Add = () => {
	const [title, setTitle] = useState('');
	const [destination, setDestination] = useState('');
	const [category, setCategory] = useState('');
	const [loading, setLoading] = useState(false);
	const [fields, setFields] = useState(false);
	const [imageAsset, setImageAsset] = useState(null);
	const [wrongImageType, setWrongImageType] = useState(false);

	const navigate = useNavigate();
	const { loggedUser: user } = useAccount();
	const { uploadImage, uploadImageDelete, addPost } = usePost();

	const imageTypes = [
		'image/png',
		'image/svg',
		'image/jpeg',
		'image/jpg',
		'image/gif',
		'image/tiff',
	];

	const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const selectedFile = event.target.files[0];

		if (imageTypes.includes(selectedFile.type)) {
			setWrongImageType(false);
			setLoading(true);

			const formData = new FormData();
			formData.append('media', selectedFile);
			const filename = await uploadImage(formData);

			setImageAsset(filename);
			setLoading(false);
		} else {
			setWrongImageType(true);
		}
	};

	const handleDeleteImage = async () => {
		await uploadImageDelete(imageAsset.fileName);
		setImageAsset(null);
	};

	const handleSavePin = async () => {
		if (title && destination && imageAsset && category) {
			setFields(false);
			let direct = destination;
			if (destination.includes('http://') || destination.includes('https://')) {
				direct = destination;
			} else {
				direct = `https://${destination}`;
			}

			const postData = {
				title,
				destination: direct,
				category,
				image: imageAsset.directory,
				imageName: imageAsset.fileName,
				email: user.email,
			};

			await addPost(postData);

			navigate('/');
		} else {
			setFields(true);

			setTimeout(() => setFields(false), 3000);
		}
	};

	return (
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
									onChange={handleUploadImage}
								/>
							</label>
						) : (
							<div className='relative h-full'>
								<img
									src={imageAsset.url}
									alt='w'
									className='w-full h-full object-cover'
								/>

								<button
									type='button'
									onClick={handleDeleteImage}
									className='absolute bottom-3 right-3 bg-white p-3 rounded-full text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'>
									<MdDelete />
								</button>
							</div>
						)}
					</div>
				</div>

				<div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
					<input
						type='text'
						value={title}
						placeholder='Add your title here'
						className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
						onChange={(event) => setTitle(event.target.value)}
						spellCheck='false'
					/>

					<div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
						<img
							src={user?.image}
							alt='user'
							className='w-10 h-10 rounded-full'
						/>
						<p className='font-bold'>{user.name}</p>
					</div>

					<input
						type='text'
						value={destination}
						placeholder='Add a destination link'
						className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
						onChange={(event) => setDestination(event.target.value)}
						spellCheck='false'
					/>
					<div className='flex flex-col'>
						<div>
							<p className='mb-2 font-semibold text-lg sm:text-xl '>
								Choose Post category
							</p>
							<select
								onChange={(event) => setCategory(event.target.value)}
								className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
								<option value='other' className='bg-white'>
									Select Category
								</option>
								{categories.map((category) => (
									<option
										className='text-base border-0 outline-none capitalize bg-white text-black'
										key={category.name}
										value={category.name}>
										{category.name}
									</option>
								))}
							</select>
						</div>
						<div className='flex justify-end items-end mt-5'>
							<button
								type='button'
								onClick={handleSavePin}
								className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'>
								Create Post
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
