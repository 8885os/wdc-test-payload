import React from 'react'
import SecondaryHero from '@/components/SecondaryHero'
import WorkTabs from '@/components/WorkTabs'
import { draftMode } from 'next/headers'
import { getPageBySlug } from '@/lib/utils/payload'
import { PAGE_QUERY, WORK_QUERY } from '@/lib/utils/queries'
import { Richtext } from '@/components/Richtext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, works: any[], index: number) {
	switch (block.__typename) {
		case 'SecondaryHero':
			return (
				<section key={`${block.__typename}-${index}`}>
					<SecondaryHero block={block} />
				</section>
			)
		case 'Accordion':
			return (
				<section key={`${block.__typename}-${index}`} className='w-full'>
					<div className='ml-auto w-[60%] mt-10 mb-10'>
						<Richtext data={block.content} />
					</div>
				</section>
			)
		case 'WorkTabs':
			return (
				<section key={`${block.__typename}-${index}`} className='w-full'>
					<WorkTabs works={works} />
				</section>
			)
		default:
			return null
	}
}

export default async function CMSPage() {
	const { isEnabled } = await draftMode()
	const pageSlug = await getPageBySlug('work', { draft: isEnabled })

	if (!pageSlug) {
		return (
			<div>
				<h1>404</h1>
				<p>Page not found</p>
			</div>
		)
	}

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
					variables: { slug: pageSlug.slug, draft: isEnabled },
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
					{}
					<h1>404</h1>
					<p>Page not found</p>
				</div>
			)
		}

		return (
			<div>
				{
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					page.layout.map((block: any, index: number) =>
						renderBlock(block, works, index)
					)
				}
			</div>
		)
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
