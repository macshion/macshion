import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader () {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={ clsx( 'hero', styles.heroBanner ) }>
            <div className="container">
                <div className={ styles.heroContent }>
                    <h1 className={ styles.heroTitle }>Hi there 👋 I'm a Front-End Engineer</h1>
                    <p className={ styles.heroSubtitle }>
                        I am passionate about coding/programming ❤️<br />
                        Focused on building products with JavaScript/TypeScript, specifically React
                    </p>

                    <div className={ styles.socialLinks }>
                        <a href="https://github.com/macshion" className={ styles.socialLink }>
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="/blog" className={ styles.socialLink }>
                            <i className="fas fa-blog"></i>
                        </a>
                    </div>

                    <div className={ styles.buttons }>
                        <Link className="button button--secondary button--lg" to="/docs/intro">
                            技術ドキュメントへ 📚
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
