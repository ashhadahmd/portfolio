import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { portfolioData } from '@/src/data/portfolio';
import { GitHubMark, LinkedInMark } from '@/src/components/ui/BrandIcons';

type Theme = 'light' | 'dark';

const navItems = [
  { label: 'Work', path: '/' },
  { label: 'Contact', path: '/contact' },
];

// index.html applies the stored or system theme before first paint.
const initialTheme = (): Theme =>
  document.documentElement.classList.contains('light') ? 'light' : 'dark';

export function Header() {
  const { profile } = portfolioData;
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 700);
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Storage blocked: the choice lasts for this visit only.
      }
      return next;
    });
  };

  const linkClass =
    'text-[12px] leading-none tracking-[-0.01em] transition-opacity hover:opacity-100';

  return (
    <header className="nav-apple sticky top-0 z-50 w-full" data-scrolled={scrolled}>
      <div className="mx-auto flex h-11 max-w-[1040px] items-center justify-between gap-3 px-6 sm:gap-6 md:px-10">
        <NavLink
          to="/"
          className="shrink-0 text-[13px] font-semibold tracking-[-0.01em] text-primary"
        >
          {profile.name}
        </NavLink>

        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6 md:gap-9">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(linkClass, isActive ? 'text-primary opacity-100' : 'text-primary opacity-70')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4 md:gap-5">
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(linkClass, 'hidden text-primary opacity-70 sm:block')}
            >
              Resume
            </a>
          )}
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden text-primary opacity-70 transition-opacity hover:opacity-100 sm:block"
          >
            <GitHubMark className="h-4 w-4" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hidden text-primary opacity-70 transition-opacity hover:opacity-100 sm:block"
          >
            <LinkedInMark className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            className="text-primary opacity-70 transition-opacity hover:opacity-100"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Sun className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
