import React from 'react';
import { draftMode } from 'next/headers';

const EnvironmentBadge = async () => {
    const isDraft = (await draftMode()).isEnabled;

    if (!isDraft) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-amber-400 text-black px-4 py-2 rounded-full shadow-lg font-bold text-sm border-2 border-amber-500 flex items-center gap-2">
            <span>🚧</span>
            <span>Preview Mode</span>
            <a href="/api/disable-draft" className="ml-2 underline text-xs">Exit</a>
        </div>
    );
};

export default EnvironmentBadge;
