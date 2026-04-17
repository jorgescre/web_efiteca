import React from 'react';

interface ReactLegalPageProps {
  title: string;
  children: React.ReactNode;
}

/**
 * ReactLegalPage — Wrapper de contenido legal Premium.
 * client:idle para hidratar con prioridad baja (HTML ya renderizado en SSR).
 * Usa los colores de marca (#8948ff, #080813) y la tipografía Inter del UI KIT.
 */
export const ReactLegalPage: React.FC<ReactLegalPageProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f1f2f4' }}>
      {/* Hero Section — usa gradiente de marca del UI KIT */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(137,72,255,0.12), transparent 30%), radial-gradient(circle at top right, rgba(137,72,255,0.08), transparent 25%), #080813',
        }}
      >
        {/* Grid decoration */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="mx-auto max-w-[1460px] px-5 md:px-10 xl:px-16 2xl:px-20 relative z-10 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8948ff] font-bold mb-4">
            Efiteca · Legal
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.1 }}>
            {title}
          </h1>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: '#fcc63d' }} />
        </div>
      </section>

      {/* Content Card */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[900px] px-5 md:px-10">
          <div
            className="rounded-[2rem] p-8 md:p-14"
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0 18px 60px rgba(16,23,20,0.08)',
            }}
          >
            <article className="prose prose-slate prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-[#0b0b13]
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-[#0b0b13]/75 prose-p:leading-relaxed
              prose-li:text-[#0b0b13]/75
              prose-strong:text-[#0b0b13] prose-strong:font-bold
              prose-a:text-[#8948ff] prose-a:no-underline hover:prose-a:underline
              prose-table:border-collapse prose-th:bg-[#f1f2f4] prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-[#e0e0e0]
              prose-code:bg-[#f1f2f4] prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-[#8948ff] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none">
              {children}
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};
