import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { sendMessage } from '@/services/messageService';
import { siteConfig } from '@/data/portfolioData';

const contactInfo = [
  { icon: HiMail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: HiPhone, label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
  { icon: HiLocationMarker, label: 'Location', value: siteConfig.location },
];

const initialForm = { name: '', email: '', subject: '', message: '' };

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const ref = useScrollAnimation({ children: true, stagger: 0.1 });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendMessage(form);
      toast.success('Message sent! I will get back to you soon.');
      setForm(initialForm);
    } catch (err) {
      toast.error(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'input-field';

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <SectionHeading subtitle="Get In Touch" title="Contact Me" />

        <div ref={ref} className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item) => (
              <GlassCard key={item.label} className="!p-5 flex items-center gap-4" hover={false}>
                <div className="icon-box !w-12 !h-12">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-medium hover:text-brand-600 dark:hover:text-accent-cyan-400 transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium">{item.value}</p>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                    name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={inputClass + ' resize-none'}
                  placeholder="Tell me about your project..."
                />
              </div>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : (
                  <>
                    <HiPaperAirplane className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
