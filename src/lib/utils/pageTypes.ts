import { Block } from 'payload'
import { JSX } from 'react'
export interface HeroTypes {
	type: 'Hero'
	__typename: string
	heading: string
	subheading: string
	image: { url: string; alt: string }
	button: { label: string; link: string }
}

export interface Page {
	title: string
	slug: string
	layout: HeroTypes[]

	content: {
		map(arg0: (block: any) => JSX.Element | null): import("react").ReactNode blocks: Block[] 
}
}

export interface HeaderType {
	logo?: { url: string; alt: string }
	navigationItems: { label: string; link: string }[]
}

export interface SidebarType {
	logo: {
		url: string
		alt: string
	}
	socialIcons: [
		{
			image: {
				alt: string
				url: string
			}
			link: string
		},
	]
}

export interface iconType {
	image: {
		alt: string
		url: string
	}
	link: string
}

export interface SecondaryHeroType {
	slug: string
	heading: string
	image: { url: string; alt: string }
	[key: string]: unknown // allows other props like _sanitized, admin, etc.
}
