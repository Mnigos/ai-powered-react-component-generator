import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		ANTHROPIC_API_KEY: z.string(),
		DATABASE_URL: z.string(),
	},
	runtimeEnv: {
		ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
		DATABASE_URL: process.env.DATABASE_URL,
	},
});
