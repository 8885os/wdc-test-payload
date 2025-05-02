import { Richtext } from '@/components/Richtext'
import { Page } from '@/lib/utils/pageTypes'
import { PAGE_QUERY, WORK_QUERY } from '@/lib/utils/queries'
import React from 'react'
import SecondaryHero from '@/components/SecondaryHero'
import WorkTabs from '@/components/WorkTabs'

interface GraphQLResponse {
	Pages: {
		docs: Page[]
	}
}

function renderBlock(block: any, works: any[]) {
	switch (block.__typename) {
		case 'SecondaryHero':
			return (
				<section key={block.id || block._key}>
					<SecondaryHero block={block} />
				</section>
			)

		case 'Accordion':
			return (
				<section key={block.id || block._key} className='w-full'>
					<div className='ml-auto w-[60%] mt-10 mb-10'>
						<Richtext data={block.content} />
					</div>
				</section>
			)

		case 'WorkTabs':
			return (
				<section key={block.id || block._key} className='w-full'>
					<WorkTabs works={works} />
				</section>
			)

		default:
			return null
	}
}

export default async function CMSPage({
	params,
}: {
	params: { slug: string }
}) {
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

	try {
		const [pageRes, workRes] = await Promise.all([
			fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: PAGE_QUERY,
					variables: { slug: pageSlug },
				}),
			}),
			fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: WORK_QUERY }),
			}),
		])

		if (!pageRes.ok || !workRes.ok) {
			throw new Error(
				`HTTP error! Page: ${pageRes.status}, Work: ${workRes.status}`
			)
		}

		const pageResult = await pageRes.json()
		const workResult = await workRes.json()

		if (pageResult.errors || workResult.errors) {
			throw new Error(
				`GraphQL error: ${JSON.stringify([pageResult.errors, workResult.errors])}`
			)
		}

		const page = pageResult?.data?.Pages?.docs?.[0]
		const works = workResult?.data?.Works?.docs ?? []

		if (!page) {
			return (
				<div>
					<h1>404</h1>
					<p>Page not found</p>
				</div>
			)
		}

		return <div>{page.layout.map((block) => renderBlock(block, works))}</div>
	} catch (error) {
		console.error('Error fetching GraphQL data:', error)
		return (
			<div>
				<h1>Error</h1>
				<p>Failed to load page data. Please try again later.</p>
			</div>
		)
	}
}
