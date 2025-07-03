import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import MermaidCodeBlock from '../MermaidCodeBlock';

export default function CodeBlockWrapper ( props ) {
    const { className, children } = props;

    // 如果是Mermaid代码块，使用自定义组件
    if ( className === 'language-mermaid' ) {
        return <MermaidCodeBlock { ...props } />;
    }

    // 否则使用原始的CodeBlock组件
    return <CodeBlock { ...props } />;
} 