'use client';
import Link from 'next/link';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import { Space_Grotesk } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';

import { NavbarSidebar } from './navbar-sidebar';

const font = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive = false }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant='outline'
      className={cn(
        'bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg',
        isActive && 'bg-black text-white hover:bg-black hover:text-white'
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: '/', children: 'Home' },
  { href: '/about', children: 'About' },
  { href: '/features', children: 'Features' },
  { href: '/pricing', children: 'Pricing' },
  { href: '/contact', children: 'Contact' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className='h-20 flex border-b justify-between font-medium bg-white'>
      <Link
        href='/'
        className='pl-6 flex items-center'
      >
        <span
          className={cn(
            'text-shadow-neo text-4xl lg:text-5xl tracking-tight font-semibold',
            font.className
          )}
        >
          paloemango
        </span>
      </Link>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      {/* Navigation Links (Desktop) */}
      <div className='hidden lg:flex items-center gap-4'>
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {/* Auth-related buttons (visible on desktop only) */}
      {session.data?.user ? (
        // If user is authenticated, show Dashboard access
        <div className='hidden lg:flex'>
          <Button
            asChild
            className='border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg'
          >
            <Link href={'/admin'}>Dashboard</Link>
          </Button>
        </div>
      ) : (
        // If user is not authenticated, show Login and Register options
        <div className='hidden lg:flex'>
          {/* Login button - navigates to sign-in page */}
          <Button
            asChild
            variant={'secondary'}
            className='border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg'
          >
            <Link
              prefetch
              href={'/sign-in'}
            >
              Log in
            </Link>
          </Button>

          {/* Register button - navigates to sign-up page */}
          <Button
            asChild
            className='border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg'
          >
            <Link
              prefetch
              href={'/sign-up'}
            >
              Start selling
            </Link>
          </Button>
        </div>
      )}

      <div className='flex lg:hidden items-center justify-center'>
        <Button
          variant={'ghost'}
          className='size-12 border-transparent bg-white'
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
