// ESLint (flat config) extending the Next.js core-web-vitals + TypeScript rules.
// Docs: https://nextjs.org/docs/app/api-reference/config/eslint
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")]

export default eslintConfig
