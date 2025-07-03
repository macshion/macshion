import React, { useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

// 修改打字机效果组件
function TypeWriter ( { text, speed = 100 } ) {
    const [ displayText, setDisplayText ] = React.useState( '' );
    const [ isTyping, setIsTyping ] = React.useState( true );

    useEffect( () => {
        let timeoutId;

        if ( isTyping && displayText.length < text.length ) {
            timeoutId = setTimeout( () => {
                setDisplayText( text.slice( 0, displayText.length + 1 ) );
            }, speed );
        } else if ( displayText.length === text.length ) {
            setIsTyping( false );
        }

        return () => {
            if ( timeoutId ) {
                clearTimeout( timeoutId );
            }
        };
    }, [ text, displayText, speed, isTyping ] );

    return (
        <span className={ styles.typewriter }>
            { displayText }
            { isTyping && <span className={ styles.cursor }>|</span> }
        </span>
    );
}

// 更新动画背景组件
function AnimatedBackground () {
    return (
        <div className={ styles.animatedBackground }>
            <div className={ styles.particles }>
                { [ ...Array( 20 ) ].map( ( _, i ) => (
                    <div key={ `particle-${ i }` } className={ styles.particle }
                        style={ {
                            '--delay': `${ Math.random() * 4 }s`,
                            '--size': `${ Math.random() * 20 + 10 }px`,
                            '--speed': `${ Math.random() * 20 + 10 }s`,
                            '--startX': `${ Math.random() * 100 }vw`,
                            '--moveX': `${ ( Math.random() - 0.5 ) * 200 }px`,
                            '--moveY': `${ ( Math.random() - 0.5 ) * 200 }px`,
                            '--rotate': `${ Math.random() * 360 }deg`,
                            '--maxOpacity': Math.random() * 0.5 + 0.3
                        } }
                    />
                ) ) }
                { [ ...Array( 5 ) ].map( ( _, i ) => (
                    <div key={ `meteor-${ i }` } className={ styles.meteor }
                        style={ {
                            '--delay': `${ Math.random() * 8 }s`,
                            top: `${ Math.random() * 100 }%`,
                            left: `${ Math.random() * 100 }%`
                        } }
                    />
                ) ) }
            </div>
        </div>
    );
}

function HomepageHeader () {
    const { siteConfig } = useDocusaurusContext();

    return (
        <header className={ clsx( 'hero', styles.heroBanner ) }>
            <AnimatedBackground />
            <div className="container">
                <div className={ styles.heroContent }>
                    <h1 className={ styles.heroTitle }>
                        <TypeWriter text="こんにちは 👋 フロントエンドエンジニアです" speed={ 80 } />
                    </h1>
                    <p className={ styles.heroSubtitle }>
                        <span className={ `${ styles.gradientText } ${ styles.fadeInFirst }` }>
                            プログラミングが好きです。 ❤️
                        </span>
                        <br />
                        <span className={ `${ styles.focusText } ${ styles.fadeInSecond }` }>
                            主にJavaScript/TypeScriptとReactを使ってWebサイトを作っています
                        </span>
                    </p>

                    <div className={ styles.socialLinks }>
                        <a href="https://github.com/macshion"
                            className={ styles.socialLink }
                            data-tooltip="GitHub">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="/blog"
                            className={ styles.socialLink }
                            data-tooltip="Blog">
                            <i className="fas fa-blog"></i>
                        </a>
                    </div>

                    <div className={ styles.buttons }>
                        <Link className={ styles.ctaButton } to="/docs/intro">
                            📚 技術スタック
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

// 修改博客文章组件
function LatestBlogPosts () {
    const { siteConfig } = useDocusaurusContext();
    const [ posts, setPosts ] = React.useState( [] );

    React.useEffect( () => {
        async function fetchRSSFeed () {
            try {
                const response = await fetch( '/blog/rss.xml' );
                const xmlText = await response.text();

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString( xmlText, 'text/xml' );
                const items = xmlDoc.querySelectorAll( 'item' );

                const blogPosts = Array.from( items ).slice( 0, 5 ).map( item => {
                    const link = item.querySelector( 'link' ).textContent;
                    const path = new URL( link ).pathname;

                    return {
                        title: item.querySelector( 'title' ).textContent,
                        link: path,
                        description: item.querySelector( 'description' ).textContent,
                        date: new Date( item.querySelector( 'pubDate' ).textContent ),
                        author: item.querySelector( 'author' )?.textContent || 'Macshion',
                        categories: Array.from( item.querySelectorAll( 'category' ) ).map( cat => cat.textContent )
                    };
                } );

                console.log( 'Parsed blog posts:', blogPosts );
                setPosts( blogPosts );
            } catch ( error ) {
                console.error( 'Error fetching RSS feed:', error );
            }
        }

        fetchRSSFeed();
    }, [] );

    if ( posts.length === 0 ) {
        return null;
    }

    return (
        <section className={ styles.latestBlogSection }>
            <div className="container">
                <div className={ styles.sectionHeader }>
                    <h2 className={ styles.sectionTitle }>
                        最近の投稿
                        <div className={ styles.titleUnderline }></div>
                    </h2>
                </div>
                <div className={ styles.blogGrid }>
                    { posts.map( ( post, idx ) => (
                        <Link
                            key={ idx }
                            to={ post.link }
                            className={ styles.blogCard }
                            style={ { '--delay': `${ idx * 0.1 }s` } }
                        >
                            <h3 className={ styles.blogTitle }>
                                { post.title }
                            </h3>
                            <p className={ styles.blogExcerpt }>
                                { post.description.replace( /<[^>]*>/g, '' ).slice( 0, 150 ) }...
                            </p>
                            <div className={ styles.blogMeta }>
                                <span className={ styles.blogDate }>
                                    { post.date.toLocaleDateString( 'ja-JP' ) }
                                </span>
                                { post.categories?.length > 0 && (
                                    <span className={ styles.blogTags }>
                                        { post.categories[ 0 ] }
                                    </span>
                                ) }
                            </div>
                        </Link>
                    ) ) }
                </div>
            </div>
        </section>
    );
}

export default function Home () {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            title={ `${ siteConfig.tagline }` }
            description="フロントエンドエンジニアの個人ブログと技術ドキュメント">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
                <LatestBlogPosts />
            </main>
        </Layout>
    );
}
