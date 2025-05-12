"use server";

import { prisma } from "@/prisma";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const anthropic = createAnthropic();

export async function generateComponent(description: string) {
	if (!description) {
		return { error: "Description is required" };
	}

	const nameResult = await generateText({
		model: anthropic("claude-3-haiku-20240307"),
		prompt: `Extract a suitable React component name (e.g., Button, UserProfileCard) from the following description. Provide only the component name, no explanations or formatting.\n\nDescription: ${description}`,
	});

	const result = await generateText({
		model: anthropic("claude-3-7-sonnet-20250219"),
		prompt: `Generate a React functional component based on the following description. Provide only the component code, no explanations or markdown formatting. The component should be ready to be rendered and include default values for props like children if applicable, also should be responsive and look good on all screen sizes. Do not use images when generating the component try to use svg. Never use external libraries. Use tailwindcss classes for all styling. This component should be named ${nameResult.text.trim()}. \n\nDescription: ${description}`,
	});

	const componentCode = result.text.replace(
		/```typescript\n|```javascript\n|```tsx\n|```jsx\n|```\n|```$/g,
		"",
	);

	const componentName = nameResult.text.trim();

	const { id } = await prisma.component.create({
		data: {
			name: componentName,
			code: componentCode,
		},
	});

	revalidateTag("components");

	redirect(`/component/${id}`);
}
