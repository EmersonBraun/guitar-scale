import { defineConfig } from "vite";
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgrPlugin from 'vite-plugin-svgr'

export default ({ mode }) => {
    return defineConfig({
        build: {
            outDir: 'build',
        },
        plugins: [
            reactRefresh(),
            svgrPlugin({
                svgrOptions: {
                    icon: true,

                    // ...svgr options (https://react-svgr.com/docs/options/)
                },
            }),
        ],
        define: {
            "process.env.NODE_ENV": `"${mode}"`,
        }
    })
}