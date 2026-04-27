import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineConfig({
    test: {
        onConsoleLog(log) {
          if (log.includes('<Suspense> is an experimental feature')) return false
        },
        projects: [
            await defineVitestProject({
                test: {
                    name: 'nuxt',
                    include: ['tests/nuxt/**/*.test.ts'],
                    environment: 'nuxt',
                    setupFiles: ['./test-setup.ts']
                },
            }),
            {
                test: {
                    name: 'unit',
                    include: ['tests/unit/**/*.test.ts'],
                    environment: 'node',
                    setupFiles: ['./test-setup.ts'],
                    alias: {
                        '~': './app',
                        '~~': './'
                    }
                }
            }
        ],
    },
})
