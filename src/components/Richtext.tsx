import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'

type RichtextProps = {
	data: SerializedEditorState
	internalDocToHref?: (docId: string) => string // optional function to convert internal doc IDs to hrefs
} & React.HTMLAttributes<HTMLDivElement>

export const Richtext: React.FC<RichtextProps> = (props: RichtextProps) => {
	const { className, ...rest } = props

	return <LexicalRichText {...rest} className={className} />
}
