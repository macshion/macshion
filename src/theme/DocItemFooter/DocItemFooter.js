import React from 'react';
import LastUpdated from '@theme/LastUpdated';

export default function DocItemFooter ( props ) {
    return (
        <footer>
            {/* 自定义显示逻辑 */ }
            <LastUpdated>
                <span>自定义最終更新: 2018年10月14日</span>
            </LastUpdated>
        </footer>
    );
}
