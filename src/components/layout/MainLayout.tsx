import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { DotGridBackground } from '../ui/DotGridBackground';
import { ScrollAssist } from '../ui/ScrollAssist';
import { portfolioData } from '@/src/data/portfolio';

export function MainLayout() {
  const { profile } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <div className="relative flex min-h-screen flex-col bg-transparent">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-on-accent"
      >
        Skip to content
      </a>

      <DotGridBackground />
      <Header />
      <ScrollAssist />

      <main id="main" className="relative z-10 flex w-full min-w-0 flex-1 flex-col">
        <div className="flex-1">
          <Outlet />
        </div>

        <footer className="w-full bg-surface-dim/80 backdrop-blur-xl">
          <div className="mx-auto max-w-[1040px] px-6 py-8 md:px-10">
            <nav aria-label="Footer" className="mb-4 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-secondary transition-colors hover:text-primary"
              >
                GitHub
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-secondary transition-colors hover:text-primary"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="text-[12px] text-secondary transition-colors hover:text-primary"
              >
                Email
              </a>
            </nav>
            <p className="border-t border-outline-variant pt-4 text-[12px] text-secondary">
              Copyright &copy; {year} {profile.name}. {profile.role}.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
