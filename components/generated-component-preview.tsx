'use client'

import { ComponentPreview } from '@/components/component-preview'
import { useGeneratedComponentStore } from '@/hooks/use-generated-component.store'

export function GeneratedComponentPreview() {
	const code = useGeneratedComponentStore(state => state.code)
	const name = useGeneratedComponentStore(state => state.name)

	return (
		<ComponentPreview
			code={code}
			name={name}
			withEditor
			className="h-full w-full"
		/>
	)
}
