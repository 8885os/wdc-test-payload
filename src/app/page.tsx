import './globals.css'
import './animations.css'
import { PAGE_QUERY } from '@/lib/utils/queries'
import { Page } from '@/lib/utils/pageTypes'
import Hero from '@/components/Hero'

interface GraphQLResponse {
	Pages: {
		docs: Page[]
	}
}

export default async function Home() {
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
					query: PAGE_QUERY,
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
	} catch (error) {
		console.error('Error fetching GraphQL data:', error)
		return (
			<div>
				<h1>Error</h1>
				<p>Failed to load pages. Please try again later.</p>
			</div>
		)
	}

	// Try to find the home page
	const page = data?.Pages.docs.find((p) => p.slug === 'home')

	if (!page || !page.layout) {
		return (
			<div>
				<h1>404</h1>
				<p>Page not found</p>
			</div>
		)
	}

	return (
		<div>
			{page.layout.map((block, index) => {
				if (block.__typename === 'PageHero') {
					return <Hero key={index} layout={block} />
				}

				// Add more block types here as needed
				return null
			})}
		</div>
	)
}
