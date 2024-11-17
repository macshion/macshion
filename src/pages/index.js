import React, { useEffect, useRef } from 'react';
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
                        <TypeWriter text="Hi there 👋 I'm a Front-End Engineer" speed={ 80 } />
                    </h1>
                    <p className={ styles.heroSubtitle }>
                        <span className={ `${ styles.gradientText } ${ styles.fadeInFirst }` }>
                            I am passionate about coding/programming ❤️
                        </span>
                        <br />
                        <span className={ `${ styles.focusText } ${ styles.fadeInSecond }` }>
                            Focused on building products with JavaScript/TypeScript, specifically React
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
                            📚 View Documentation
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function Home () {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            title={ siteConfig.title }
            description="Front-End Engineer's personal blog and technical documentation">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
