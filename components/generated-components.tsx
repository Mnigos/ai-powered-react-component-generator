import { ComponentPreview } from "@/components/component-preview";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getLatestComponents } from "@/data/components";
import Link from "next/link";

export async function GeneratedComponents() {
	const components = await getLatestComponents();

	return (
		<div className="grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-1 lg:text-left">
			<h2 className="text-xl font-bold mb-4">Generated Components</h2>
			{components.length === 0 ? (
				<p>No components generated yet.</p>
			) : (
				<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{components.map(({ id, name, code, createdAt }) => (
						<Card key={id}>
							<CardHeader className="gap-6">
								<div className="flex flex-col gap-2">
									<CardTitle>{name}</CardTitle>
									<CardDescription>
										Created: {new Date(createdAt).toLocaleDateString()}{" "}
										{new Date(createdAt).toLocaleTimeString()}
									</CardDescription>
								</div>

								<Link href={`/component/${id}`}>
									<Button variant="outline" className="w-full">
										View Details
									</Button>
								</Link>
							</CardHeader>
							<CardContent className="mt-0">
								<ComponentPreview
									code={code}
									name={name}
									className="!max-w-full"
									previewProps={{
										showOpenInCodeSandbox: false,
										showRefreshButton: false,
									}}
								/>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
