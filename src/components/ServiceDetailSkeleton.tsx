import React from 'react';

export const ServiceDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header Navigation skeleton */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="h-10 w-40 bg-slate-200 rounded-xl animate-pulse" />
          <div className="h-10 w-36 bg-slate-200 rounded-xl animate-pulse" />
        </div>

        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-36 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Full-width Banner Image Skeleton with Shimmer */}
        <div className="w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-2xl bg-slate-300 animate-pulse relative overflow-hidden shadow-lg border border-slate-200">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/50 to-transparent -translate-x-full animate-shimmer" />
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 space-y-3">
            <div className="h-6 w-24 bg-slate-400/60 rounded-md animate-pulse" />
            <div className="h-8 sm:h-10 w-64 sm:w-96 bg-slate-400/80 rounded-lg animate-pulse" />
            <div className="h-4 w-48 bg-slate-400/50 rounded animate-pulse" />
          </div>
        </div>

        {/* Description Box Skeleton */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="h-5 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-6 w-20 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-6 w-24 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-6 w-28 bg-slate-200 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Features List Skeleton */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="h-7 w-56 bg-slate-200 rounded-lg animate-pulse mb-6" />
          <div className="grid sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-14 bg-slate-100 rounded-xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
