import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const TechStackList = [
    { name: 'JavaScript', icon: '/img/tech/javascript.png', color: '#F7DF1E', link: '/docs/frontend/javascript' },
    { name: 'TypeScript', icon: '/img/tech/typescript.png', color: '#3178C6', link: '/docs/frontend/typescript' },
    { name: 'React', icon: '/img/tech/react.png', color: '#61DAFB', link: '/docs/frontend/react' },
    { name: 'Vue', icon: '/img/tech/vue.png', color: '#4FC08D', link: '/docs/frontend/vue' },
    { name: 'HTML5', icon: '/img/tech/html5.png', color: '#E34F26', link: '/docs/frontend/html' },
    { name: 'CSS3', icon: '/img/tech/css3.png', color: '#1572B6', link: '/docs/frontend/css' },
    { name: 'Git', icon: '/img/tech/git.png', color: '#F05032', link: '/docs/devops/git' },
    { name: 'GO', icon: '/img/tech/go.png', color: '#2496ED', link: '/docs/backend/go' },
    { name: 'Docker', icon: '/img/tech/docker.png', color: '#2496ED', link: '#' },
    { name: 'Webpack', icon: '/img/tech/webpack.png', color: '#8DD6F9', link: '#' },
    { name: 'VS Code', icon: '/img/tech/vscode.png', color: '#007ACC', link: '#' },
    { name: 'npm', icon: '/img/tech/npm.png', color: '#CB3837', link: '#' },
    { name: 'Node.js', icon: '/img/tech/nodejs.png', color: '#339933', link: '#' },
    { name: 'Sass', icon: '/img/tech/sass.png', color: '#CC6699', link: '#' },
    { name: 'Less', icon: '/img/tech/less.png', color: '#1D365D', link: '#' },
    { name: 'Bootstrap', icon: '/img/tech/bootstrap.png', color: '#7952B3', link: '#' },
    { name: 'jQuery', icon: '/img/tech/jquery.png', color: '#0769AD', link: '#' },
];

const FeatureList = [
    {
        title: 'フロントエンド専門家',
        description: (
            <div style={ { textAlign: 'left' } }>
                ⭐8年以上のWeb開発経験を持つ<br />
                フロントエンドエンジニア。<br />
                ⭐レスポンシブデザイン、クロスブラウザ対応、パフォーマンス最適化が得意。<a href="/blog">ブログへ</a>
            </div>
        ),
        icon: '👨‍💻'
    },
    {
        title: '技術スタック',
        description: (
            <>
                <a href="/docs/frontend/html">HTML5</a> /
                <a href="/docs/frontend/css">CSS3</a><br />
                <a href="/docs/frontend/javascript">JavaScript</a> /
                <a href="/docs/frontend/typescript">TypeScript</a><br />
                <a href="/docs/frontend/react">React</a> /
                <a href="/docs/frontend/vue">Vue</a> /
                <a href="/docs/backend/go">Golang</a><br />
                <a href="/docs/devops/linux">Linux</a> /
                <a href="/docs/devops/git">Git</a> /
                <a href="/docs/devops/open-api">OpenAPI</a> /
                <a href="/docs/devops/powershell">Powershell</a>
            </>
        ),
        icon: '🛠️'
    },
    {
        title: '専門分野',
        description: (
            <>
                UI/UXの最適化<br />
                パフォーマンスチューニング<br />
                最新技術のキャッチアップ<br />
                <br />
                私の<a href="/docs/intro">📚 技術ライブラリー</a>
            </>
        ),
        icon: '🎯'
    },
];

function TechStack () {
    const sectionRef = useRef( null );

    useEffect( () => {
        const observer = new IntersectionObserver(
            ( entries ) => {
                entries.forEach( entry => {
                    if ( entry.isIntersecting ) {
                        entry.target.classList.add( styles.techStackVisible );
                    }
                } );
            },
            { threshold: 0.1 }
        );

        if ( sectionRef.current ) {
            observer.observe( sectionRef.current );
        }

        return () => observer.disconnect();
    }, [] );

    return (
        <div className={ styles.techStackSection } ref={ sectionRef }>
            <div className={ styles.sectionHeader }>
                <h2 className={ styles.techStackTitle }>
                    私の技術スタック
                    <div className={ styles.titleUnderline }></div>
                </h2>
                <p className={ styles.sectionDescription }>
                    IT業界において約9年間、多様な分野での大規模システム開発に携わり、特にフロントエンド開発を中心に活動してきました。
                </p>
            </div>
            <div className={ styles.techStackGrid }>
                { TechStackList.map( ( tech, idx ) => (
                    <div
                        key={ idx }
                        className={ styles.techItem }
                        style={ { '--delay': `${ idx * 0.1 }s` } }
                        onClick={ () => window.location.href = window.location.origin + tech.link }
                    >
                        <div className={ styles.techIconWrapper }>
                            <img
                                src={ tech.icon }
                                alt={ tech.name }
                                className={ styles.techIcon }
                                style={ {
                                    filter: `drop-shadow(0 0 5px ${ tech.color }40)`
                                } }
                            />
                            <div className={ styles.techIconGlow } style={ { backgroundColor: tech.color } }></div>
                        </div>
                        <span className={ styles.techName }>{ tech.name }</span>
                    </div>
                ) ) }
            </div>
        </div>
    );
}

function Feature ( { title, description, icon } ) {
    const featureRef = useRef( null );

    useEffect( () => {
        const observer = new IntersectionObserver(
            ( entries ) => {
                entries.forEach( entry => {
                    if ( entry.isIntersecting ) {
                        entry.target.classList.add( styles.featureVisible );
                    }
                } );
            },
            { threshold: 0.1 }
        );

        if ( featureRef.current ) {
            observer.observe( featureRef.current );
        }

        return () => observer.disconnect();
    }, [] );

    return (
        <div className={ clsx( 'col col--4' ) } ref={ featureRef }>
            <div className={ styles.featureCard }>
                <div className={ styles.featureIconWrapper }>
                    <div className={ styles.featureIcon }>{ icon }</div>
                    <div className={ styles.featureIconRing }></div>
                </div>
                <div className="text--center padding-horiz--md">
                    <h3>{ title }</h3>
                    <p>{ description }</p>
                </div>
            </div>
        </div>
    );
}

export default function HomepageFeatures () {
    return (
        <>
            <TechStack />
            <section className={ styles.featuresSection }>
                <div className={ styles.sectionHeader }>
                    <h2 className={ styles.sectionTitle }>
                        私がやっていること
                        <div className={ styles.titleUnderline }></div>
                    </h2>
                    <p className={ styles.sectionDescription }>
                        日本に滞在している中國人のフロントエンドエンジニアとして現代のWeb開発をやっています。
                    </p>
                </div>
                <div className="container">
                    <div className="row">
                        { FeatureList.map( ( props, idx ) => (
                            <Feature key={ idx } { ...props } />
                        ) ) }
                    </div>
                </div>
            </section>
        </>
    );
}
