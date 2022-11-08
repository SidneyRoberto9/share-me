import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home(
	props: InferGetStaticPropsType<typeof getServerSideProps>
) {
	const { data: session } = useSession();

	useEffect(() => {
		console.log(props);
	}, []);

	return (
		<div className='text-3xl font-bold underline text-white flex flex-col justify-center items-center'>
			<h1>hello World: {session.user.name}</h1>
			<Image
				src={session.user.image}
				alt='icon'
				width={96}
				height={96}
				layout='fixed'
			/>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
};
