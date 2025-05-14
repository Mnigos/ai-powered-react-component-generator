'use client'

import {
	type GeneratedComponentState,
	type GeneratedComponentStoreApi,
	createGeneratedComponentStore,
} from '@/stores/generated-component.store'
import { type PropsWithChildren, createContext, useRef } from 'react'

export const GeneratedComponentContext = createContext<
	GeneratedComponentStoreApi | undefined
>(undefined)

interface GeneratedComponentProviderProps extends PropsWithChildren {
	initialState: GeneratedComponentState
}

export function GeneratedComponentProvider({
	children,
	initialState,
}: GeneratedComponentProviderProps) {
	const storeRef = useRef<GeneratedComponentStoreApi>(null)

	storeRef.current ??= createGeneratedComponentStore(initialState)

	return (
		<GeneratedComponentContext.Provider value={storeRef.current}>
			{children}
		</GeneratedComponentContext.Provider>
	)
}
