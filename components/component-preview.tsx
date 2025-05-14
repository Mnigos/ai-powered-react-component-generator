'use client'

import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import {
	type PreviewProps,
	SandpackCodeEditor,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider,
} from '@codesandbox/sandpack-react'
import { sandpackDark } from '@codesandbox/sandpack-themes'
import { useState } from 'react'

export interface ComponentPreviewProps {
	code: string
	name: string
	withEditor?: boolean
	className?: string
	previewProps?: PreviewProps
}

export function ComponentPreview({
	code,
	name,
	withEditor = false,
	className,
	previewProps,
}: Readonly<ComponentPreviewProps>) {
	const [copied, setCopied] = useState(false)
	const isLargeScreen = useMediaQuery('lg')

	async function handleCopyClick() {
		if (code) {
			try {
				await navigator.clipboard.writeText(code)
				setCopied(true)
				setTimeout(() => setCopied(false), 2000)
			} catch (err) {
				console.error('Failed to copy code:', err)
			}
		}
	}

	return (
		<div className={cn('flex h-full w-full flex-col', className)}>
			<SandpackProvider
				template="react"
				theme={sandpackDark}
				files={{
					[`/${name}.jsx`]: {
						code,
						active: true,
					},
					'/App.js': {
						code: `import React from "react";\nimport ${name} from "./${name}.jsx";\n\nexport default function App() {\n  return <${name} />;\n\n}`,
						hidden: true,
					},
				}}
				options={{
					externalResources: ['https://cdn.tailwindcss.com'],
				}}
			>
				<SandpackLayout
					className={cn(
						'h-full w-full overflow-auto',
						withEditor && isLargeScreen && '!grid !grid-cols-2',
					)}
				>
					{withEditor && isLargeScreen && <SandpackCodeEditor />}

					<SandpackPreview
						{...previewProps}
						actionsChildren={
							<div className="flex items-center space-x-2">
								<Button onClick={handleCopyClick} size="sm" disabled={!code}>
									{copied ? 'Copied!' : 'Copy Code'}
								</Button>
							</div>
						}
					/>
				</SandpackLayout>
			</SandpackProvider>
		</div>
	)
}
