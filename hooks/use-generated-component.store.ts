'use client'

import { GeneratedComponentContext } from '@/providers/generated-component.provider'
import type { GeneratedComponentStore } from '@/stores/generated-component.store'
import { use } from 'react'
import { useStore } from 'zustand'

export function useGeneratedComponentStore<
	TSelectorResult = GeneratedComponentStore,
>(
	selector: (state: GeneratedComponentStore) => TSelectorResult = state =>
		state as TSelectorResult,
) {
	const context = use(GeneratedComponentContext)

	if (!context)
		throw new Error(
			'useGeneratedComponentStore must be used within a GeneratedComponentProvider',
		)

	return useStore(context, selector)
}
