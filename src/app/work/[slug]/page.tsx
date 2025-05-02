import ImageGrid from '@/components/ImageGrid'
import { Richtext } from '@/components/Richtext'
import { Page } from '@/lib/utils/pageTypes'
import { WORK_QUERY } from '@/lib/utils/queries'
import React from 'react'
import ImageHero from '@/components/ImageHero'

interface GraphQLResponse {
	Works: {
		docs: Page[]
	}
}

function renderBlock(block: any) {
	switch (block.__typename) {
		case 'Hero':
			return (
				<section key={block.id || block._key}>
					<ImageHero
						slug={block.slug}
						heading={block.heading}
						image={block.image}
						alt={block.alt}
					/>
				</section>
			)

		case 'RichText':
			console.log(JSON.stringify(block.content) + 'block' + block)

			return (
				<section key={block.id || block._key} className='w-full'>
					<>{/* console.log('SDJFLDSKJAF;LKSFJD' + block.) */}</>
					<div className='ml-auto w-[60%] mt-10 mb-10'>
						<Richtext data={block.content} />
					</div>
				</section>
			)

		case 'ImageGrid':
			return (
				<section key={block.id || block._key}>
					<ImageGrid images={block.images} />
				</section>
			)
		/*
        case 'OtherProjects':
            return (
                <section key={block.id || block._key}>
                    <p>{block.info}</p>
                </section>
            )

        case 'Contact':
            return (
                <section key={block.id || block._key}>
                    <p>{block.info}</p>
                </section>
            )
 */
		default:
			return null
	}
}

export default async function CMSPage({
	params,
}: {
	params: { slug: string }
}) {
	console.log('REACHED')

	const pageSlug = params.slug

	if (!process.env.NEXT_PUBLIC_BASE_URL) {
		console.error('NEXT_PUBLIC_BASE_URL is not defined')
		return (
			<div>
				<h1>Error</h1>
				<p>Server configuration error. Please contact the administrator.</p>
			</div>
		)
	}

	let data: GraphQLResponse | null = null

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// 'Authorization': `Bearer ${process.env.API_TOKEN}`,
				},
				body: JSON.stringify({
					query: WORK_QUERY,
					variables: { slug: pageSlug },
				}),
			}
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const result = await response.json()

		if (result.errors) {
			throw new Error(`GraphQL error: ${JSON.stringify(result.errors)}`)
		}

		data = result.data
		console.log(data, 'FOR THIS')
	} catch (error) {
		console.error('Error fetching GraphQL data:', error)
		return (
			<div>
				<h1>Error</h1>
				<p>Failed to load page data. Please try again later.</p>
			</div>
		)
	}

	if (!data) {
		return (
			<div>
				<h1>404</h1>
				<p>Page not found</p>
			</div>
		)
	}

	return (
		<div>{data.Works.docs[0].content.map((block) => renderBlock(block))}</div>
	)
}
