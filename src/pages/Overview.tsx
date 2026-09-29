import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Mail } from 'lucide-react';
import { portfolioData, type CaseStudy } from '@/src/data/portfolio';
import { APPLE_EASE, Reveal, MaskedLines } from '@/src/components/ui/Reveal';
import { GitHubMark, LinkedInMark } from '@/src/components/ui/BrandIcons';
import { CaseStudyCover } from '@/src/components/ui/CaseStudyCover';
import { cn } from '@/src/lib/utils';

function StoryBeat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[7rem_1fr] sm:gap-8">
      <dt className="pt-1 text-[14px] font-semibold tracking-[-0.016em] text-secondary">
        {label}
      </dt>
      <dd className="type-body measure">{children}</dd>
    </div>
  );
}

function Timeline({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Reveal>
        <p className="type-caption mb-8 text-center">{title}</p>
      </Reveal>
      <ul className="card-apple-sm mx-auto max-w-[680px] divide-y divide-outline-variant px-6 md:px-10">
        {children}
      </ul>
    </div>
  );
}

function TimelineRow({ label, dates }: { label: string; dates: string }) {
  return (
    <p className="type-caption mt-1 flex flex-wrap items-baseline justify-between gap-x-4">
      <span className="text-on-surface-variant">{label}</span>
      <span>{dates}</span>
    </p>
  );
}

const socialButtonClass =
  'flex h-11 w-11 items-center justify-center rounded-full bg-surface-low text-primary transition-colors hover:bg-surface-high';

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const detailsId = `${study.slug}-details`;

  return (
    <Reveal as="article" className="card-apple overflow-hidden">
      <CaseStudyCover
        art={study.cover.art}
        accentRgb={study.cover.accentRgb}
        fit={study.cover.fit}
        logo={study.cover.logo}
        logoDark={study.cover.logoDark}
        logoHeight={study.cover.logoHeight}
        pillLight={study.cover.pillLight}
        name={study.title}
        href={study.cover.href}
      />

      <div className="px-6 py-10 md:px-12 md:py-14">
        <h3 className="type-title mb-4">{study.title}</h3>
        <p className="type-intro measure mb-6">{study.summary}</p>

        {study.impactHeadline && (
          <p className="mb-8">
            <span className="inline-flex items-center rounded-full bg-surface-high px-4 py-2 text-[14px] font-semibold tracking-[-0.016em] text-primary">
              {study.impactHeadline}
            </span>
          </p>
        )}

        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={detailsId}
          aria-label={
            expanded ? 'Hide architecture and results' : 'Show architecture and results'
          }
          className="link-apple link-apple-plain inline-flex items-center gap-1.5"
        >
          Architecture &amp; Results
          <ChevronDown
            className={cn('h-4 w-4 transition-transform duration-300', expanded && 'rotate-180')}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={detailsId}
              key="details"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: APPLE_EASE }}
              className="overflow-hidden"
            >
              <dl className="mb-2 mt-8 flex flex-col gap-7 border-t border-outline-variant pt-8">
                <StoryBeat label="Problem">{study.problem}</StoryBeat>
                <StoryBeat label="Approach">{study.solution}</StoryBeat>
                {study.impact.length > 0 && (
                  <StoryBeat label="Result">
                    <ul className="flex flex-col gap-2">
                      {study.impact.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </StoryBeat>
                )}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ul className="flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <li key={tech} className="tech-badge">
                {tech}
              </li>
            ))}
          </ul>

          {study.confidential && (
            <span className="type-caption">Under NDA with Toko Labs</span>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Overview() {
  const { profile, hero, proof, caseStudies, experience, education, competencies } = portfolioData;
  const reduceMotion = useReducedMotion();

  const showProof = proof.metrics.length > 0 || proof.badges.length > 0;

  const showWork = caseStudies.length > 0;
  const showStack = competencies.length > 0;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const heroStyle = reduceMotion
    ? undefined
    : { opacity: heroOpacity, scale: heroScale, y: heroY };

  return (
    <>
      <section
        ref={heroRef}
        className="bg-transparent py-28 text-center sm:py-16 md:py-24 lg:py-28 2xl:py-32"
      >
        <motion.div className="container-apple" style={heroStyle}>
          <Reveal immediate y={20}>
            <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-secondary sm:mb-4">
              {hero.subhead}
            </p>
          </Reveal>

          <h1 className="type-display mx-auto mb-10 max-w-[16ch] sm:mb-6">
            <MaskedLines immediate delay={0.1} lines={[hero.headline, hero.headlineSecond]} />
          </h1>

          <Reveal immediate delay={0.34} y={20} className="hidden sm:block">
            <p className="type-intro mx-auto mb-8 max-w-[48ch]">{hero.description}</p>
          </Reveal>

          <Reveal immediate delay={0.42} y={16}>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:mb-6">
              <a href={hero.primaryCta.href} className="btn-primary">
                {hero.primaryCta.label}
              </a>
              <a href={hero.secondaryCta.href} className="link-apple">
                {hero.secondaryCta.label}
              </a>
            </div>
            <p className="type-caption">{profile.coreStack.join(' · ')}</p>
          </Reveal>
        </motion.div>
      </section>

      {showProof && (
        <section
          aria-label="Track record"
          className="bg-surface-dim/80 py-14 backdrop-blur-xl md:py-20 lg:py-24"
        >
          <div className="container-apple text-center">
            <Reveal>
              <p className="label-caps mb-10">{proof.intro}</p>
            </Reveal>

            {proof.metrics.length > 0 && (
              <dl className="flex flex-wrap justify-center gap-x-12 gap-y-10">
                {proof.metrics.map((metric, index) => (
                  <Reveal
                    key={metric.label}
                    delay={index * 0.1}
                    className="flex max-w-[16rem] flex-col-reverse"
                  >
                    <dt className="type-caption mt-3">{metric.label}</dt>
                    <dd className="whitespace-nowrap text-[44px] font-semibold leading-none tracking-[-0.015em] text-primary md:text-[56px]">
                      {metric.value}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            )}

            {proof.badges.length > 0 && (
              <Reveal>
                <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
                  {proof.badges.map((badge) => (
                    <li key={badge.label} className="status-pill">
                      {badge.label}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

          </div>
        </section>
      )}

      {showWork && (
        <section id="work" className="bg-transparent py-16 md:py-24 lg:py-28 2xl:py-32">
          <div className="container-apple">
            <div className="mb-16 text-center md:mb-20">
              <h2 className="type-section mb-5">
                <MaskedLines lines={['Selected work.']} />
              </h2>
              <Reveal delay={0.12}>
                <p className="type-intro mx-auto max-w-[46ch]">
                  {caseStudies.length === 1
                    ? 'One system, and the reasoning that produced it.'
                    : `${caseStudies.length} systems, and the reasoning that produced them.`}
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-6">
              {caseStudies.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>

          </div>
        </section>
      )}

      <section
        id="experience"
        aria-label="Experience and education"
        className="bg-transparent pb-16 md:pb-24 lg:pb-28 2xl:pb-32"
      >
        <div className="container-apple flex flex-col gap-14">
          <Timeline title="Experience">
            {experience.map((job, index) => (
              <Reveal key={job.company} as="li" delay={index * 0.08} className="py-6">
                <p className="text-[17px] font-semibold tracking-[-0.022em] text-primary">
                  {job.company}
                </p>
                {job.roles.map((role) => (
                  <TimelineRow key={role.title} label={role.title} dates={role.dates} />
                ))}
                {job.summary && <p className="type-body measure mt-3">{job.summary}</p>}
              </Reveal>
            ))}
          </Timeline>

          <Timeline title="Education">
            {education.map((item, index) => (
              <Reveal key={item.school} as="li" delay={index * 0.08} className="py-6">
                <p className="text-[17px] font-semibold tracking-[-0.022em] text-primary">
                  {item.school}
                </p>
                <TimelineRow label={item.degree} dates={item.dates} />
                {item.activity && <p className="type-body measure mt-3">{item.activity}</p>}
              </Reveal>
            ))}
          </Timeline>
        </div>
      </section>

      {showStack && (
        <section
          id="skills"
          className="bg-surface-dim/80 py-16 backdrop-blur-xl md:py-24 lg:py-28 2xl:py-32"
        >
          <div className="container-apple">
            <div className="mb-16 text-center">
              <h2 className="type-section mb-5">
                <MaskedLines lines={['The stack.']} />
              </h2>
              <Reveal delay={0.12}>
                <p className="type-intro mx-auto max-w-[46ch]">
                  Grouped so you can find the one you came looking for.
                </p>
              </Reveal>
            </div>

            <dl className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {competencies.map((group, index) => (
                <Reveal key={group.group} delay={index * 0.08}>
                  <dt className="mb-3 border-b border-outline-variant pb-3 text-[17px] font-semibold tracking-[-0.022em] text-primary">
                    {group.group}
                  </dt>
                  <dd className="type-body">{group.items.join(', ')}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section
        id="contact"
        className="bg-transparent py-20 text-center md:py-28 lg:py-32 2xl:py-36"
      >
        <div className="container-apple">
          <h2 className="type-section mx-auto mb-5 max-w-[18ch]">
            <MaskedLines lines={["Let's talk."]} />
          </h2>
          <Reveal delay={0.12}>
            <p className="type-intro mx-auto mb-10 max-w-[44ch]">
              If you have a system that needs to get faster or more reliable, tell me about it.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mb-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                Email me
              </a>
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Download resume
                </a>
              )}
              <a href={`mailto:${profile.email}`} className="link-apple link-apple-plain">
                {profile.email}
              </a>
            </div>

            <ul className="flex justify-center gap-6">
              <li>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className={socialButtonClass}
                >
                  <GitHubMark />
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className={socialButtonClass}
                >
                  <LinkedInMark className="h-[18px] w-[18px]" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label={`Email ${profile.name}`}
                  className={socialButtonClass}
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
