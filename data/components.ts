import { prisma } from '@/prisma'
import { unstable_cache } from 'next/cache'

export const getLatestComponents = unstable_cache(
	async () => {
		const components = await prisma.component.findMany({
			select: {
				id: true,
				name: true,
				code: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 20,
		})
		return components
	},
	['latest_components'],
	{ tags: ['components'] },
)

export const getComponentById = unstable_cache(
	async (id: string) => {
		const component = await prisma.component.findUnique({
			where: { id },
		})

		return component
	},
	['component_by_id'],
	{ tags: ['components'] },
)
