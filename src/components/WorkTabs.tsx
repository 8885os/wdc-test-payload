'use client'
import Image from 'next/image'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WorkTabs({ works }: { works: any[] }) {
	const [activeTab, setActiveTab] = React.useState('All')

	const filteredWorks =
		activeTab === 'All'
			? works
			: works.filter((work) => work.category === activeTab)

	return (
		<div className='flex flex-col gap-5'>
			{/* Tabs */}
			<div className='flex gap-2 mt-10 ml-1'>
				<button
					className={`border border-transparent bg-transparent border-r-black text-black ${
						activeTab === 'All' ? 'text-black font-semibold' : 'text-gray-500'
					}`}
					onClick={() => setActiveTab('All')}>
					All
				</button>
				<button
					className={`border border-transparent bg-transparent border-r-black text-black ${
						activeTab === 'Interior design'
							? 'text-black font-semibold'
							: 'text-gray-500'
					}`}
					onClick={() => setActiveTab('Interior design')}>
					Interior design
				</button>
				<button
					className={`border border-transparent bg-transparent text-black ${
						activeTab === 'Web design'
							? 'text-black font-semibold'
							: 'text-gray-500'
					}`}
					onClick={() => setActiveTab('Web design')}>
					Web design
				</button>
			</div>

			{/* Work Items */}
			<div className='grid grid-cols-2 gap-4'>
				{filteredWorks.map((work) => {
					const heroBlock = work.content.find(
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						(item: any) => item.__typename === 'Hero'
					)

					const heroImage = heroBlock?.image
					return (
						<a
							key={work.id}
							href={`/work/${work.slug}`}
							className='no-underline'>
							<div
								key={work.id}
								className='border p-4 ml-1 relative min-h-[400px] w-[600px] overflow-hidden flex flex-col'>
								{heroImage && (
									<Image
										className='absolute inset-0 z-0 object-cover'
										src={`${process.env.NEXT_PUBLIC_BASE_URL}${heroImage.url}`}
										alt={heroImage.alt}
										fill
									/>
								)}

								<h3 className='relative z-10 text-white'>{work.title}</h3>

								<p className='relative z-10 mt-auto text-white'>
									{work.summary}
								</p>
							</div>
						</a>
					)
				})}
			</div>
		</div>
	)
}
