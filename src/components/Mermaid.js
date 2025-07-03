import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

// 配置Mermaid
mermaid.initialize( {
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
    },
} );

const Mermaid = ( { chart } ) => {
    const elementRef = useRef( null );

    useEffect( () => {
        if ( elementRef.current ) {
            elementRef.current.innerHTML = '';
            mermaid.render( 'mermaid-svg-' + Math.random().toString( 36 ).substr( 2, 9 ), chart ).then( ( { svg } ) => {
                elementRef.current.innerHTML = svg;
            } );
        }
    }, [ chart ] );

    return <div ref={ elementRef } className="mermaid-container" />;
};

export default Mermaid; 