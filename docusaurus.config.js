const lightCodeTheme = require( 'prism-react-renderer/themes/github' );
const darkCodeTheme = require( 'prism-react-renderer/themes/dracula' );

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
( module.exports = {
    title: 'Macshion\'s Blog',
    tagline: 'カンの技術ブログ | フロントエンドエンジニア',
    url: 'https://kann.jp',
    baseUrl: '/',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'macshion', // Usually your GitHub org/user name.
    projectName: 'macshion', // Usually your repo name.
    i18n: {
        defaultLocale: 'ja',
        locales: [ 'ja' ],
    },

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ( {
                docs: {
                    path: 'docs',
                    routeBasePath: 'docs',
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                },
                blog: {
                    path: 'blog',
                    routeBasePath: 'blog',
                    showReadingTime: true,
                    blogTitle: 'ブログ',
                    blogDescription: 'フロントエンドエンジニアのブログ',
                    postsPerPage: 5,
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'すべての投稿',
                    feedOptions: {
                        type: [ 'rss', 'json' ],
                        title: 'Macshion\'s Blog',
                        description: 'A Front-End Engineer\'s Blog',
                        copyright: `Copyright © ${ new Date().getFullYear() } Macshion's Blog`,
                        language: 'ja',
                    },
                },
                theme: {
                    customCss: require.resolve( './src/css/custom.css' ),
                },
            } ),
        ],
    ],
    // plugins: [
    //     [
    //         '@docusaurus/plugin-content-docs',
    //         {
    //             id: 'jp',
    //             path: 'jp',
    //             routeBasePath: 'jp',
    //             // sidebarPath: require.resolve( './sidebars-jp.js' ),
    //             showLastUpdateAuthor: true,
    //             showLastUpdateTime: true,
    //         },
    //     ],
    // ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ( {
            navbar: {
                title: 'Macshion',
                logo: {
                    alt: 'Macshion\'s Blog',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: 'ライブラリー',
                    },
                    { to: '/blog', label: 'ブログ', position: 'left' },
                    // {
                    //     type: 'doc',
                    //     docId: 'intro',
                    //     docsPluginId: 'jp',
                    //     position: 'left',
                    //     label: '日本語',
                    // },
                    {
                        href: 'https://github.com/macshion/macshion',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Engineer’s Library',
                                to: '/docs/intro',
                            },
                        ],
                    },
                    // {
                    //     title: 'Community',
                    //     items: [
                    //         {
                    //             label: 'Stack Overflow',
                    //             href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                    //         },
                    //         {
                    //             label: 'Discord',
                    //             href: 'https://discordapp.com/invite/docusaurus',
                    //         },
                    //         {
                    //             label: 'Twitter',
                    //             href: 'https://twitter.com/docusaurus',
                    //         },
                    //     ],
                    // },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/macshion/macshion',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${ new Date().getFullYear() } My Project, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
            metadata: [ { name: 'lastUpdated', content: 'true' } ],
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: false,
                respectPrefersColorScheme: false,
            },
            head: [
                // 其他配置...
                {
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
                    rel: 'stylesheet',
                    type: 'text/css',
                },
            ],
        } ),
} );
