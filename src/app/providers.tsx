'use client';

import { useRouter } from 'next/navigation';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import {MathJaxContext} from 'better-react-mathjax';

interface ProvidersProps {
  children: React.ReactNode;
  className?: string;
}

export function Providers({ children, className }: ProvidersProps) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <HeroUIProvider navigate={router.push} className={className}>
        <MathJaxContext config={{
          loader: { load: ['input/tex', '[tex]/mhchem', 'output/svg'] },
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            packages: {'[+]': ['mhchem', "html", 'textmacros']}
          },
          svg: {
            fontCache: 'global',
          },
        }}>
          {children}
        </MathJaxContext>

      </HeroUIProvider>
    </ThemeProvider>
  );
}
