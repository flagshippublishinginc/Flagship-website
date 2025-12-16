import React from 'react';

const EnvironmentBadge = () => {
    // Read the environment variable
    const mode = process.env.NEXT_PUBLIC_SANITY_MODE;
    const isPreview = mode === 'preview';

    // If not in preview/staging mode, render nothing
    if (!isPreview) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-amber-400 text-black px-4 py-2 rounded-full shadow-lg font-bold text-sm border-2 border-amber-500 flex items-center gap-2">
            <span>🚧</span>
            <span>Staging Mode</span>
        </div>
    );
};

export default EnvironmentBadge;
