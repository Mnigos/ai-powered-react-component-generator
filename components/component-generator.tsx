'use client'

import { generateComponent } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LoaderCircle } from 'lucide-react'
import { useState, useTransition } from 'react'
import { WordRotate } from './magicui/word-rotate'

export function ComponentGenerator() {
	const [description, setDescription] = useState('')
	const [isLoading, startTransition] = useTransition()

	async function handleGenerateClick() {
		startTransition(async () => {
			await generateComponent(description)
		})
	}

	return (
		<div className="grid text-center lg:mb-0 lg:w-full lg:max-w-screen-2xl lg:grid-cols-1 lg:text-left">
			<div className="grid w-full gap-1.5">
				<Label htmlFor="message">Component Description</Label>
				<Textarea
					placeholder="Type your component description here."
					id="message"
					className="min-h-[100px]"
					value={description}
					onChange={e => setDescription(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							handleGenerateClick()
						}
					}}
				/>
				<Button onClick={handleGenerateClick} disabled={isLoading}>
					{isLoading ? (
						<>
							<LoaderCircle className="animate-spin" />
							<WordRotate
								className="w-[150px]"
								words={[
									'Generating...',
									'Sit tight...',
									'This might take a while...',
									'Hold on...',
									'Just a little longer...',
								]}
							/>
						</>
					) : (
						'Generate Component'
					)}
				</Button>
			</div>
		</div>
	)
}
