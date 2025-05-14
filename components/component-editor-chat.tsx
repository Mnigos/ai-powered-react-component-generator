'use client'

import { adjustComponentCode } from '@/app/actions'
import { useGeneratedComponentStore } from '@/hooks/use-generated-component.store'
import { type FormEvent, useState, useTransition } from 'react'

export function ComponentEditorChat() {
	const componentId = useGeneratedComponentStore(state => state.componentId)
	const code = useGeneratedComponentStore(state => state.code)
	const messages = useGeneratedComponentStore(state => state.messages)
	const addMessage = useGeneratedComponentStore(state => state.addMessage)
	const setCode = useGeneratedComponentStore(state => state.setCode)
	const [prompt, setPrompt] = useState('')
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | null>(null)

	async function submitPrompt() {
		setError(null)

		if (!prompt.trim()) {
			setError('Please enter a prompt to adjust the component.')
			return
		}

		startTransition(async () => {
			const result = await adjustComponentCode(componentId, code, prompt)

			if (result.error) {
				setError(result.error)
			} else if (result.code) {
				setCode(result.code)
				addMessage({
					id: `user-${Date.now()}`,
					content: prompt,
					createdAt: new Date(),
				})
				setPrompt('')
			}
		})
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		submitPrompt()
	}

	return (
		<div className="flex h-full flex-col gap-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
			<h3 className="font-semibold text-lg">Adjust Component</h3>

			<div className="flex-1 space-y-2 overflow-y-auto pr-2">
				{messages.map(message => (
					<div key={message.id} className="rounded-md bg-muted p-3 text-sm">
						<p>{message.content}</p>
						<p className="mt-1 text-muted-foreground text-xs">
							{new Date(message.createdAt).toLocaleTimeString()}
						</p>
					</div>
				))}
			</div>

			<form onSubmit={handleSubmit} className="mt-auto flex flex-col gap-3">
				<textarea
					value={prompt}
					onChange={e => setPrompt(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault()
							submitPrompt()
						}
					}}
					placeholder="e.g., 'Change the button color to blue' or 'Add a title above the input field'"
					className="min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isPending}
				/>
				{error && <p className="text-destructive text-sm">{error}</p>}
				<button
					type="submit"
					disabled={isPending || !prompt.trim()}
					className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
				>
					{isPending ? 'Adjusting...' : 'Submit Adjustment'}
				</button>
			</form>
		</div>
	)
}
