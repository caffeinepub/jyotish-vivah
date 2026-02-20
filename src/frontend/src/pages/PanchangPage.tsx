import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { usePanchangData } from '@/hooks/usePanchangData';
import PanchangCard from '@/components/PanchangCard';
import { marathiStrings } from '@/i18n/marathi';
import { AlertCircle } from 'lucide-react';

export default function PanchangPage() {
  const { data: panchang, isLoading, error } = usePanchangData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-saffron mb-2">
          {marathiStrings.panchang.title}
        </h1>
        <p className="text-muted-foreground">{marathiStrings.panchang.subtitle}</p>
      </div>

      {isLoading && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{marathiStrings.errors.panchangNotFound}</AlertDescription>
        </Alert>
      )}

      {panchang && <PanchangCard panchang={panchang} />}
    </div>
  );
}
