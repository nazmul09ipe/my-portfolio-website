import { HiCode, HiColorSwatch, HiServer, HiLightningBolt } from 'react-icons/hi';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { services } from '@/data/portfolioData';

const iconMap = {
  code: HiCode,
  design: HiColorSwatch,
  api: HiServer,
  speed: HiLightningBolt,
};

export function Services() {
  const ref = useScrollAnimation({ children: true, stagger: 0.1 });

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <SectionHeading subtitle="What I Offer" title="Services" />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || HiCode;
            return (
              <GlassCard key={service.id} className="text-center sm:text-left">
                <div className="icon-box mx-auto sm:mx-0 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 tracking-tight">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
