import { extractFilenameFromUrl } from '@/lib/utils/converters/imageUrl'
import { ImageHeroType } from '@/lib/utils/pageTypes'
import Image from 'next/image'
import React from 'react'

export default function ImageHero({ image }: ImageHeroType) {
	return (
		<div>
			<Image
				className='w-full object-cover h-[70vh]'
				src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${extractFilenameFromUrl(image.url)}`}
				alt={image.alt}
				width={1000}
				height={1000}
			/>
		</div>
	)
}
