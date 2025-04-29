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
		<div className='relative w-full h-[60vh] overflow-hidden'>
			<Image
				priority
				className='mt-8 absolute animate-[var(--animate-background)] w-full object-cover'
				src={`${url}${image}`}
				alt={imagealt}
				fill
			/>
			<div className='absolute top-0 left-0 w-full h-full'>
				<h1>{layout.heading}</h1>
				<h2>{layout.subheading}</h2>
				<button onClick={() => router.push(layout.button.link)}>
					{layout.button.label}
				</button>
			</div>
		</div>
	)
}
