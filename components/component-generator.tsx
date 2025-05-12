"use client";

import { generateComponent } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";

export function ComponentGenerator() {
	const [description, setDescription] = useState("");
	const [isLoading, startTransition] = useTransition();

	async function handleGenerateClick() {
		startTransition(async () => {
			await generateComponent(description);
		});
	}

	return (
		<div className="grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-1 lg:text-left">
			<div className="grid w-full gap-1.5">
				<Label htmlFor="message">Component Description</Label>
				<Textarea
					placeholder="Type your component description here."
					id="message"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Button onClick={handleGenerateClick} disabled={isLoading}>
					{isLoading ? "Generating..." : "Generate Component"}
				</Button>
			</div>
		</div>
	);
}
