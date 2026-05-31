import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

/**
 * Decorative Lottie animation — loads a lightweight dev-themed animation from CDN.
 * Replace `animationUrl` with your own Lottie JSON for a custom look.
 */
export function LottieDecor({ className = 'w-64 h-64' }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://assets2.lottiefiles.com/packages/lf20_u4yrau.json')
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <Lottie
      animationData={data}
      loop
      className={className}
      aria-hidden
    />
  );
}
