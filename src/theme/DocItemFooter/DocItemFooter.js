import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';

function LastUpdatedAtDate ( { lastUpdatedAt } ) {
    return (
        <>
            { lastUpdatedAt && (
                <div className={ clsx( ThemeClassNames.common.lastUpdated ) }>
                    <span>最終更新: </span>
                    <time dateTime={ new Date( lastUpdatedAt * 1000 ).toISOString() }>
                        { new Date( lastUpdatedAt * 1000 ).toLocaleDateString( 'ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        } ) }
                    </time>
                </div>
            ) }
        </>
    );
}

function LastUpdatedByUser ( { lastUpdatedBy } ) {
    return lastUpdatedBy ? (
        <div className="docLastUpdatedBy">
            <span>更新者: { lastUpdatedBy }</span>
        </div>
    ) : null;
}

export default function DocItemFooter ( { content: DocContent } ) {
    const { metadata } = DocContent;
    const { lastUpdatedAt, lastUpdatedBy, frontMatter } = metadata;

    const updateDate = frontMatter.last_update?.date
        ? new Date( frontMatter.last_update.date ).getTime() / 1000
        : lastUpdatedAt;

    return (
        <footer
            className={ clsx( ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg' ) }>
            { ( updateDate || lastUpdatedBy ) && (
                <div className="docLastUpdated">
                    <LastUpdatedAtDate
                        lastUpdatedAt={ updateDate }
                    />
                    <LastUpdatedByUser
                        lastUpdatedBy={ lastUpdatedBy }
                    />
                </div>
            ) }
        </footer>
    );
}
