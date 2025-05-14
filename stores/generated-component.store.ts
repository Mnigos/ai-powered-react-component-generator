import type { Message } from '@/lib/prisma'
import { create } from 'zustand'

export interface GeneratedComponentState {
	name: string
	code: string
	messages: Readonly<Omit<Message, 'componentId'>>[]
	componentId: string
}

export interface GeneratedComponentActions {
	setCode: (code: string) => void
	addMessage: (message: Readonly<Omit<Message, 'componentId'>>) => void
}

export interface GeneratedComponentStore
	extends GeneratedComponentState,
		GeneratedComponentActions {}

export const createGeneratedComponentStore = (
	initialState: GeneratedComponentState,
) =>
	create<GeneratedComponentStore>(set => ({
		...initialState,
		setCode: code => set({ code }),
		addMessage: message =>
			set(state => ({ messages: [...state.messages, message] })),
	}))

export type GeneratedComponentStoreApi = ReturnType<
	typeof createGeneratedComponentStore
>
