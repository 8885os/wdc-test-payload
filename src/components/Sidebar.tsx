import { iconType, SidebarType } from '@/lib/utils/pageTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = ({ ...data }: SidebarType) => {
	console.log(data)

	return (
		<div className='z-50 bg-white flex-col flex justify-around h-[100vh] mt-0 fixed top-0 left-0 bottom-0'>
			<nav className='bg-white flex-col flex-1 justify-between self-stretch items-center w-16 mt-0 mb-0 pt-4 pb-5 flex'>
				<Link
					href='/'
					aria-current='page'
					className='w-inline-block w--current'>
					<Image
						src={`${process.env.NEXT_PUBLIC_BASE_URL}${data.logo.url}`}
						loading='eager'
						width='20'
						height='189'
						alt={data.logo.alt}
						aria-label='WDC Creative logo'
					/>
				</Link>
				<div className='flex-initial flex-col flex p-0 mt-auto self-center justify-between h-auto'>
					{data.socialIcons.map((icon: iconType) => (
						<a
							href={`${icon.link}`}
							target='_blank'
							className='mb-2 flex '
							key={icon.image.url}>
							<Image
								src={`${process.env.NEXT_PUBLIC_BASE_URL}${icon.image.url}`}
								width={30}
								height={30}
								loading='eager'
								alt={icon.image.alt}
							/>
						</a>
					))}
				</div>
			</nav>
		</div>
	)
}

export default Sidebar
