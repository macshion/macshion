import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

// 配置Mermaid
mermaid.initialize( {
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
    },
} );

export default function MermaidCodeBlock ( { children, className } ) {
    const elementRef = useRef( null );

    useEffect( () => {
        if ( elementRef.current && className === 'language-mermaid' ) {
            elementRef.current.innerHTML = '';
            const id = 'mermaid-' + Math.random().toString( 36 ).substr( 2, 9 );
            mermaid.render( id, children ).then( ( { svg } ) => {
                elementRef.current.innerHTML = svg;
            } );
        }
    }, [ children, className ] );

    if ( className === 'language-mermaid' ) {
        return <div ref={ elementRef } className="mermaid-container" />;
    }

    return null;
} 