import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const TechStackList = [
    { name: 'JavaScript', icon: '/img/tech/javascript.png', color: '#F7DF1E' },
    { name: 'TypeScript', icon: '/img/tech/typescript.png', color: '#3178C6' },
    { name: 'React', icon: '/img/tech/react.png', color: '#61DAFB' },
    { name: 'Vue', icon: '/img/tech/vue.png', color: '#4FC08D' },
    { name: 'Node.js', icon: '/img/tech/nodejs.png', color: '#339933' },
    { name: 'HTML5', icon: '/img/tech/html5.png', color: '#E34F26' },
    { name: 'CSS3', icon: '/img/tech/css3.png', color: '#1572B6' },
    { name: 'Sass', icon: '/img/tech/sass.png', color: '#CC6699' },
    { name: 'Less', icon: '/img/tech/less.png', color: '#1D365D' },
    { name: 'Bootstrap', icon: '/img/tech/bootstrap.png', color: '#7952B3' },
    { name: 'jQuery', icon: '/img/tech/jquery.png', color: '#0769AD' },
    { name: 'Git', icon: '/img/tech/git.png', color: '#F05032' },
    { name: 'Docker', icon: '/img/tech/docker.png', color: '#2496ED' },
    { name: 'Webpack', icon: '/img/tech/webpack.png', color: '#8DD6F9' },
    { name: 'VS Code', icon: '/img/tech/vscode.png', color: '#007ACC' },
    { name: 'npm', icon: '/img/tech/npm.png', color: '#CB3837' }
];

const FeatureList = [
    {
        title: 'フロントエンド専門家',
        description: (
            <>
                8年以上のWeb開発経験を持つフロントエンドエンジニア。
                レスポンシブデザイン、クロスブラウザ対応、パフォーマンス最適化が得意。
            </>
        ),
        icon: '👨‍💻'
    },
    {
        title: '技術スタック',
        description: (
            <>
                HTML5 / CSS3 / JavaScript / TypeScript<br />
                React / Vue / Node.js<br />
                Sass / Less / Bootstrap / jQuery
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
                最新技術のキャッチアップ
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
                    My Tech Stack
                    <div className={ styles.titleUnderline }></div>
                </h2>
                <p className={ styles.sectionDescription }>
                    8+ years of experience with modern web technologies
                </p>
            </div>
            <div className={ styles.techStackGrid }>
                { TechStackList.map( ( tech, idx ) => (
                    <div
                        key={ idx }
                        className={ styles.techItem }
                        style={ { '--delay': `${ idx * 0.1 }s` } }
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
                        What I Do
                        <div className={ styles.titleUnderline }></div>
                    </h2>
                    <p className={ styles.sectionDescription }>
                        Specialized in modern web development
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
