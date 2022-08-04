import { resolve } from 'path'

module.exports = {
    alias: {
        '/@/': resolve(__dirname, 'src'),
        '/@components/': resolve(__dirname, 'src/components'),
        '/@views/': resolve(__dirname, 'src/views'),
        '/@assets/': resolve(__dirname, 'src/assets'),
        '/@models/': resolve(__dirname, 'src/models')
    },
    optimizeDeps: {
        include: []
    },
    outDir: "../../www/"
}
