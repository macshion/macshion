import React from 'react';
import Mermaid from './Mermaid';

const MermaidMDX = ( { children } ) => {
    // 移除可能的代码块标记
    const chartCode = children.replace( /^```mermaid\n?/, '' ).replace( /\n?```$/, '' );

    return <Mermaid chart={ chartCode } />;
};

export default MermaidMDX; 