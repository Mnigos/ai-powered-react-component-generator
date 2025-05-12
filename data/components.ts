import { prisma } from "@/prisma";
import { unstable_cache } from "next/cache";

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
				createdAt: "desc",
			},
			take: 20,
		});
		return components;
	},
	["latest_components"], // Key for the cache
	{ tags: ["components"] }, // Tag for revalidation
);
