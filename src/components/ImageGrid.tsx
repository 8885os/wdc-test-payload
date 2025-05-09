import React from 'react'
import Image from 'next/image'
import { extractFilenameFromUrl } from '@/lib/utils/converters/imageUrl'

type ImageType = {
	image: { url: string; alt: string }
}

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL

export default function ImageGrid({ images }: { images: ImageType[] }) {
	return (
		<div className='grid grid-cols-[40%_60%] grid-rows-2 gap-4 h-[70vh]'>
			{/* Top-left image */}
			<div className='relative w-full h-full item-1'>
				<Image
					src={`${BASE_URL}/${extractFilenameFromUrl(images[1].image.url)}`}
					alt={images[1].image.alt}
					fill
					className='object-cover'
				/>
			</div>

			{/* Bottom-left image */}
			<div className='relative w-full h-full item-2'>
				<Image
					src={`${BASE_URL}/${extractFilenameFromUrl(images[2].image.url)}`}
					alt={images[2].image.alt}
					fill
					className='object-cover'
				/>
			</div>

			{/* Right image spanning 2 rows */}
			<div className='relative w-full h-full item-3'>
				<>{console.log(images[0].image.url)}</>
				<Image
					src={`${BASE_URL}/${extractFilenameFromUrl(images[0].image.url)}`}
					alt={images[0].image.alt}
					fill
					className='object-cover'
				/>
			</div>
		</div>
	)
}
