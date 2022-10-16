import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';

export interface HeadingProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  className?: string;
}

export function Heading({ size, children, asChild, className }: HeadingProps) {
  const Comp = asChild ? Slot : 'h2';
  return (
    <Comp
      className={clsx(
        'text-gray-100 font-bold font-sans',
        {
          'text-lg': size === 'sm',
          'text-xl': size === 'md',
          'text-2xl': size === 'lg',
        },
        className
      )}
    >
      {children}
    </Comp>
  );
}
