import { SecondaryHeroTypes } from '@/lib/utils/pageTypes'
import React from 'react'

export default function SecondaryHero({
	block,
}: {
	block: SecondaryHeroTypes
}) {
	return (
		<div className='w-full flex justify-center items-center pt-[2rem] pb-[2rem] bg-[#f1ebe7]'>
			<h1>{block.heading}</h1>
		</div>
	)
}
