'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import React, { useEffect, useState } from 'react'

export const RefreshRouteOnSave: React.FC = () => {
	const [isChanged, setIsChanged] = useState(false)

	useEffect(() => {
		// Function to check for content changes in the draft mode
		const checkForDraftUpdates = () => {
			const previewContent = document.querySelector('[data-preview-content]') // Replace with your actual draft content selector
			const draftContentHash = previewContent?.textContent // Or a specific hash value to compare content changes

			// Check for changes in the draft content by comparing the hash (or other content value)
			const currentDraftHash = sessionStorage.getItem('draft-hash')
			if (draftContentHash && draftContentHash !== currentDraftHash) {
				sessionStorage.setItem('draft-hash', draftContentHash)
				setIsChanged(true)
			}
		}

		// Poll every 5 seconds
		const interval = setInterval(checkForDraftUpdates, 5000)

		// Clear the interval on component unmount
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		// When the content changes, trigger a reload
		if (isChanged) {
			window.location.reload()
		}
	}, [isChanged])

	return (
		<PayloadLivePreview
			refresh={() => {}}
			serverURL={process.env.NEXT_PUBLIC_APP_URL || ''}
		/>
	)
}
