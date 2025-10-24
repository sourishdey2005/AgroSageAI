
'use client';

import { cn } from '@/lib/utils';
import React from 'react';

const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn('flex flex-col', className)} {...props} />
  )
);
Timeline.displayName = 'Timeline';

const TimelineItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('relative flex flex-row-reverse', className)} {...props} />
  )
);
TimelineItem.displayName = 'TimelineItem';


const TimelineConnector = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('absolute right-[1.4rem] top-[5px] h-full w-[1px] translate-x-1/2 bg-border', className)}
      {...props}
    />
  )
);
TimelineConnector.displayName = 'TimelineConnector';


const TimelineHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-4', className)} {...props} />
  )
);
TimelineHeader.displayName = 'TimelineHeader';


const TimelineIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex h-12 w-12 items-center justify-center rounded-full border bg-background', className)}
      {...props}
    />
  )
);
TimelineIcon.displayName = 'TimelineIcon';


const TimelineTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-semibold', className)} {...props} />
  )
);
TimelineTitle.displayName = 'TimelineTitle';

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn('p-4 pt-2 pl-[4.5rem]', className)} {...props} />
    )
  );
  TimelineContent.displayName = 'TimelineContent';

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineTitle,
  TimelineContent,
};
