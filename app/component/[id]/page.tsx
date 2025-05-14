import { ComponentEditorChat } from '@/components/component-editor-chat'
import { GeneratedComponentPreview } from '@/components/generated-component-preview'
import { GeneratedComponents } from '@/components/generated-components'
import { prisma } from '@/prisma'
import { GeneratedComponentProvider } from '@/providers/generated-component.provider'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ComponentDetailsPageProps {
	params: Promise<{ id: string }>
}

export default async function ComponentDetailsPageServerWrapper({
	params,
}: Readonly<ComponentDetailsPageProps>) {
	const { id } = await params

	const foundComponent = await prisma.component.findUnique({
		where: {
			id,
		},
		include: {
			messages: {
				orderBy: {
					createdAt: 'asc',
				},
			},
		},
	})

	if (!foundComponent) notFound()

	return (
		<main className="mx-auto flex min-h-screen max-w-screen-2xl flex-col gap-12 p-4 sm:p-8 lg:gap-16">
			<section className="flex flex-col gap-6">
				<header className="w-full max-w-screen-2xl">
					<Link
						href="/"
						className="inline-flex items-center font-medium text-blue-500 text-sm hover:text-blue-600"
					>
						<ArrowLeft className="mr-1 h-4 w-4" /> Back to Generator
					</Link>

					<h1 className="font-bold text-2xl">
						Component - {foundComponent.name}
					</h1>
				</header>

				<GeneratedComponentProvider
					initialState={{
						componentId: id,
						...foundComponent,
					}}
				>
					<div className="flex h-[80vh] flex-1 flex-col gap-6 overflow-hidden md:gap-8 lg:flex-row">
						<div className="h-[500px] w-full md:overflow-auto">
							<GeneratedComponentPreview />
						</div>
						<div className="w-full min-w-[350px] overflow-auto lg:max-w-[400px]">
							<ComponentEditorChat />
						</div>
					</div>
				</GeneratedComponentProvider>
			</section>

			<GeneratedComponents />
		</main>
	)
}
