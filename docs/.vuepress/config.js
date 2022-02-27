const path = require('path')

module.exports = {
    title: 'Dev-Phantom',
    description: 'Just Playing around',
    markdown: {
        lineNumbers: true
    },
    alias: {
        '@styles': path.resolve(__dirname, './styles')
    },
    scss: {
        additionalData: `
            @import "~@styles/index.scss"
        `
    }

}