"use client";

import { getSandpackCssText } from "@codesandbox/sandpack-react";
import { useServerInsertedHTML } from "next/navigation";

export function SandPackCSS() {
	useServerInsertedHTML(() => {
		return (
			<style
				// biome-ignore lint/security/noDangerouslySetInnerHtml: https://sandpack.codesandbox.io/docs/guides/ssr
				dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
				id="sandpack"
			/>
		);
	});
	return null;
}
