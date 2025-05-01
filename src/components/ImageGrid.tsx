import React from 'react'
import Image from 'next/image'

type ImageType = {
	image: { url: string; alt: string }
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function ImageGrid({ images }: { images: ImageType[] }) {
	console.log(images)
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: '1rem',
			}}>
			{/* Left column: two stacked images */}
			<div>
				<Image
					src={BASE_URL + images[1].image.url}
					alt={images[1].image.alt}
					width={500}
					height={500}
					layout='responsive'
				/>
			</div>
			<div>
				<Image
					src={BASE_URL + images[2].image.url}
					alt={images[2].image.alt}
					width={1000}
					height={1000}
					layout='responsive'
				/>
			</div>
			<div style={{ gridRow: 'span 2' }}>
				<Image
					src={BASE_URL + images[0].image.url}
					alt={images[0].image.alt}
					width={500}
					height={500}
					layout='responsive'
				/>
			</div>
		</div>
	)
}
