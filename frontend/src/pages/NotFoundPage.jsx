import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center">
        <h1 className="font-display text-8xl font-bold gradient-text mb-4">404</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Page not found
        </p>
        <Button href="/">Back to Home</Button>
      </div>
    </div>
  );
}