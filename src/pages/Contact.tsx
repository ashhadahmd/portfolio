import React, { useState } from 'react';
import { portfolioData } from '@/src/data/portfolio';
import { Reveal } from '@/src/components/ui/Reveal';
import { GitHubMark, LinkedInMark } from '@/src/components/ui/BrandIcons';
import { Avatar } from '@/src/components/ui/Avatar';

export function Contact() {
  const { profile } = portfolioData;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const labelClass = 'text-[14px] font-semibold tracking-[-0.016em] text-primary';

  return (
    <div className="bg-transparent py-16 md:py-24 lg:py-28 2xl:py-32">
      <div className="container-apple">
        <Reveal immediate className="mb-16 text-center md:mb-20">
          <h1 className="type-section mb-5">Start a conversation.</h1>
          <p className="type-intro mx-auto max-w-[46ch]">
            Tell me what you're building and where it hurts.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.5fr]">
          <Reveal immediate delay={0.1} className="card-apple flex flex-col gap-10 p-8 md:p-10">
            {profile.avatar && (
              <div className="flex items-center gap-4 border-b border-outline-variant pb-10">
                <Avatar src={profile.avatar} name={profile.name} size={64} />
                <div className="min-w-0">
                  <h2 className="text-[17px] font-semibold tracking-[-0.016em] text-primary">
                    {profile.name}
                  </h2>
                  <p className="type-caption">
                    {profile.role}
                    {profile.currentStatus ? ` · ${profile.currentStatus}` : ''}
                  </p>
                </div>
              </div>
            )}

            <div>
              <p className="type-caption mb-2">Email</p>
              <a href={`mailto:${profile.email}`} className="link-apple link-apple-plain">
                {profile.email}
              </a>
            </div>

            <div>
              <p className="type-caption mb-2">Location</p>
              <p className="type-body">{profile.location}</p>
            </div>

            {profile.resumeUrl && (
              <div>
                <p className="type-caption mb-3">Resume</p>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Download PDF
                </a>
              </div>
            )}

            <div>
              <p className="type-caption mb-4">Elsewhere</p>
              <ul className="flex gap-4">
                <li>
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-high text-primary transition-opacity hover:opacity-80"
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
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-high text-primary transition-opacity hover:opacity-80"
                  >
                    <LinkedInMark className="h-[18px] w-[18px]" />
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal immediate delay={0.18}>
            <form onSubmit={handleSubmit} className="card-apple flex flex-col gap-6 p-8 md:p-10">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className={labelClass}>
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="field-apple bg-surface-high"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className={labelClass}>
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="field-apple bg-surface-high"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="field-apple bg-surface-high"
                  placeholder="Backend role at Acme"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={7}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="field-apple resize-none bg-surface-high"
                  placeholder="What are you building, and what is it doing that it shouldn't?"
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <button type="submit" className="btn-primary">
                  Send message
                </button>
                <p className="type-caption">Opens in your mail app.</p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
