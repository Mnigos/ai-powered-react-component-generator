import { ComponentGenerator } from "@/components/component-generator";
import { GeneratedComponents } from "@/components/generated-components";

export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center gap-16 p-24">
			<ComponentGenerator />

			<GeneratedComponents />
		</main>
	);
}
