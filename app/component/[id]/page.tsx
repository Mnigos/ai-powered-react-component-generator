import { ComponentPreview } from "@/components/component-preview";
import { prisma } from "@/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type ComponentDetailsPageProps = Readonly<{
	params: Promise<{
		id: string;
	}>;
}>;

export default async function ComponentDetailsPage({
	params,
}: ComponentDetailsPageProps) {
	const { id } = await params;

	const foundComponent = await prisma.component.findUnique({
		where: {
			id,
		},
	});

	if (!foundComponent) notFound();

	const { name, code } = foundComponent;

	return (
		<main className="flex min-h-screen h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-24">
			<div className="w-full max-w-screen-xl">
				<Link
					href="/"
					className="inline-flex items-center mb-6 text-sm font-medium text-blue-500 hover:text-blue-600"
				>
					<ArrowLeft /> Back to Generator
				</Link>
				<h1 className="text-2xl font-bold mb-8">Component - {name}</h1>
			</div>

			<ComponentPreview
				code={code}
				name={name}
				withEditor
				className="flex-1 w-full h-[80%]"
			/>
		</main>
	);
}
