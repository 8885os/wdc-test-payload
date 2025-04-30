'use client'
import { HeroTypes } from '@/lib/utils/pageTypes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Hero({ layout }: { layout: HeroTypes }) {
	const url = process.env.NEXT_PUBLIC_BASE_URL

	const router = useRouter()

	const image = layout.image.url
	const imagealt = layout.image.alt

	return (
		<div className='relative w-full h-[95vh] overflow-hidden'>
			<Image
				priority
				className='mt-8 absolute animate-[var(--animate-background)] w-full object-cover'
				src={`${url}${image}`}
				alt={imagealt}
				fill
			/>
			<div className='flex flex-col items-start absolute left-0 w-full h-full'>
				<div className='relative flex flex-col top-0 left-0 w-full h-full mt-[150px] mb-[150px] pl-[30px] pr-[30px] sm:pl-[180px] sm:pr-[60px] max-w-[770px]'>
					<h1 className='spacing text-left text-[58px] leading-[48px] sm:text-[80px] sm:leading-[64px] lg:text-[116px] lg:leading-[96px] text-white mb-[25px]'>
						{layout.heading}
						<span className='dot'>.</span>
					</h1>
					<p className='text-[1rem] mb-3 text-white leading-[22px]'>
						{layout.subheading}
					</p>
					<button
						className='primary-button'
						onClick={() => router.push(layout.button.link)}>
						{layout.button.label}
					</button>
				</div>
			</div>
		</div>
	)
}
