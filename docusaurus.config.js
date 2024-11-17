const lightCodeTheme = require( 'prism-react-renderer/themes/github' );
const darkCodeTheme = require( 'prism-react-renderer/themes/dracula' );

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
( module.exports = {
    title: 'Macshion',
    tagline: 'カンの技術ブログ',
    url: 'https://blog.macshion.net',
    baseUrl: '/',
    onBrokenLinks: 'throw',
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
                    // sidebarPath: require.resolve( './sidebars.js' ),
                    // Please change this to your repo.
                    // editUrl: 'https://github.com/macshion/macshion/docs/',
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                },
                blog: {
                    path: 'blog',
                    routeBasePath: 'blog',
                    showReadingTime: true,
                    blogTitle: 'Blog',
                    blogDescription: 'A Front-End Engineer\'s Blog',
                    postsPerPage: 5,
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'All Posts',
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
                        label: 'Engineer\'s Library',
                    },
                    { to: '/blog', label: 'Blog', position: 'left' },
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
