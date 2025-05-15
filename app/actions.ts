'use server'

import { prisma } from '@/prisma'
import { createAnthropic } from '@ai-sdk/anthropic'
import { generateObject } from 'ai'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const anthropic = createAnthropic()
const model = anthropic('claude-3-7-sonnet-20250219')
const maxTokens = 64000

const componentSchema = z.object({
	name: z
		.string()
		.describe(
			'The name of the React component (e.g., Button, UserProfileCard).',
		),
	code: z.string().describe('The React functional component code.'),
})

export async function generateComponent(description: string) {
	if (!description) {
		return { error: 'Description is required' }
	}

	const { object } = await generateObject({
		model,
		schema: componentSchema,
		maxTokens,
		prompt: `Generate a React functional component based on the following description and extract a suitable component name. Provide the component name and code as a JSON object with "name" and "code" fields. The component should be ready to be rendered and include default values for props like children if applicable, also should be responsive and look good on all screen sizes. Do not use images when generating the component try to use svg. Never use external libraries. The code should be ready to use. Do not submit unfinished code or code with invalid syntax. Use tailwindcss classes for all styling.\n\nDescription: ${description}`,
	})

	const { id } = await prisma.component.create({
		data: {
			...object,
			messages: {
				create: {
					content: description,
				},
			},
		},
	})

	revalidateTag('components')

	redirect(`/component/${id}`)
}

export async function adjustComponentCode(
	componentId: string,
	currentCode: string,
	prompt: string,
) {
	if (!prompt) return { error: 'Prompt is required' }

	if (!currentCode) return { error: 'Current code is required' }

	if (!componentId) return { error: 'Component ID is required' }

	const result = await generateObject({
		model,
		schema: componentSchema,
		maxTokens,
		prompt: `Adjust the following React component code based on the prompt. Provide only the adjusted component code, no explanations or markdown formatting. Ensure the component remains functional and adheres to best practices. Use tailwindcss classes for all styling. Do not use images when generating the component try to use svg. Never use external libraries.

Existing Code:
${currentCode}

User Prompt: ${prompt}`,
	})

	const adjustedCode = result.object.code.replace(
		/```typescript\n|```javascript\n|```tsx\n|```jsx\n|```\n|```$/g,
		'',
	)

	await prisma.component.update({
		where: {
			id: componentId,
		},
		data: {
			code: adjustedCode,
			messages: {
				create: {
					content: prompt,
				},
			},
		},
	})

	revalidateTag('components')

	return { code: adjustedCode }
}
