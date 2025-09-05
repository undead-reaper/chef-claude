import { createEnv } from "@t3-oss/env-nextjs"
import z from "zod"

export const serverEnv = createEnv({
    server: {
        GEMINI_API_KEY: z.string().nonempty(),
    },
    emptyStringAsUndefined: true,
    experimental__runtimeEnv: true,
})