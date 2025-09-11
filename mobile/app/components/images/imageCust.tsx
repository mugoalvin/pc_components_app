import { blurhash } from '@/utils/placeholders'
import { Image } from "expo-image"
import React from 'react'

interface ImageCustProps {
	source?: string | number // number for static image imports
	width?: number,
	height?: number
}

export default function ImageCust({ source, height, width }: ImageCustProps) {
	if (!source) return null;

	return (
		<Image
			source={source}
			placeholder={{ blurhash }}
			contentFit="contain"
			transition={1000}
			style={{ width, height }}
			className="rounded-lg"
		/>
	)
}