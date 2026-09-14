import React from 'react';

interface ServiceDetailSkeletonProps {
  theme?: 'dark' | 'light';
}

export const ServiceDetailSkeleton: React.FC<ServiceDetailSkeletonProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-fadeIn transition-colors duration-300 ${
      isLight ? 'bg-slate-50 text-slate-800' : 'bg-navy-950 text-slate-100'
    }`}>
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header Navigation skeleton */}
        <div className={`flex items-center justify-between pb-4 border-b ${
          isLight ? 'border-slate-200' : 'border-navy-800'
        }`}>
          <div className={`h-10 w-40 rounded-xl animate-pulse ${
            isLight ? 'bg-slate-200' : 'bg-navy-900'
          }`} />
          <div className={`h-10 w-36 rounded-xl animate-pulse ${
            isLight ? 'bg-slate-200' : 'bg-navy-900'
          }`} />
        </div>

        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-3">
          <div className={`h-4 w-20 rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
          <div className={`h-4 w-4 rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
          <div className={`h-4 w-28 rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
          <div className={`h-4 w-4 rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
          <div className={`h-4 w-36 rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
        </div>

        {/* Full-width Banner Image Skeleton with Shimmer */}
        <div className={`w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-2xl animate-pulse relative overflow-hidden shadow-lg border ${
          isLight ? 'bg-slate-300 border-slate-200' : 'bg-navy-900 border-navy-800'
        }`}>
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/20 to-transparent -translate-x-full animate-shimmer`} />
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 space-y-3">
            <div className={`h-6 w-24 rounded-md animate-pulse ${isLight ? 'bg-slate-400/60' : 'bg-navy-800'}`} />
            <div className={`h-8 sm:h-10 w-64 sm:w-96 rounded-lg animate-pulse ${isLight ? 'bg-slate-400/80' : 'bg-navy-700'}`} />
            <div className={`h-4 w-48 rounded animate-pulse ${isLight ? 'bg-slate-400/50' : 'bg-navy-800/80'}`} />
          </div>
        </div>

        {/* Description Box Skeleton */}
        <div className={`rounded-2xl p-6 sm:p-8 border shadow-sm space-y-4 ${
          isLight ? 'bg-white border-slate-200' : 'bg-navy-900 border-navy-800'
        }`}>
          <div className={`h-5 w-48 rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
          <div className="space-y-2">
            <div className={`h-4 w-full rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
            <div className={`h-4 w-5/6 rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
            <div className={`h-4 w-4/6 rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
          </div>
          <div className="flex gap-2 pt-2">
            <div className={`h-6 w-20 rounded-full animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
            <div className={`h-6 w-24 rounded-full animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
            <div className={`h-6 w-28 rounded-full animate-pulse ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
          </div>
        </div>

        {/* Features List Skeleton */}
        <div className={`rounded-2xl p-6 sm:p-8 border shadow-sm space-y-4 ${
          isLight ? 'bg-white border-slate-200' : 'bg-navy-900 border-navy-800'
        }`}>
          <div className={`h-7 w-56 rounded-lg animate-pulse mb-6 ${isLight ? 'bg-slate-200' : 'bg-navy-800'}`} />
          <div className="grid sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`h-14 rounded-xl border animate-pulse ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-navy-950 border-navy-800'
              }`} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
