module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app",
         // https://github.com/storybookjs/storybook/tree/master/addons/a11y
        '@storybook/addon-a11y',
    ]
}
