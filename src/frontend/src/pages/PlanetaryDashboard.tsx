import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { usePlanetaryData } from '@/hooks/usePlanetaryData';
import PlanetCard from '@/components/PlanetCard';
import { marathiStrings } from '@/i18n/marathi';
import { AlertCircle } from 'lucide-react';

export default function PlanetaryDashboard() {
  const { data: report, isLoading, error } = usePlanetaryData();

  const formatMarathiDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-saffron mb-2">
          {marathiStrings.planetary.title}
        </h1>
        <p className="text-muted-foreground">{marathiStrings.planetary.subtitle}</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{marathiStrings.errors.reportNotFound}</AlertDescription>
        </Alert>
      )}

      {report && (
        <>
          <Card className="bg-gradient-to-br from-saffron/10 to-deepGold/10 border-saffron/20">
            <CardHeader>
              <CardTitle>{marathiStrings.planetary.todayDate}</CardTitle>
              <CardDescription className="text-lg font-semibold">
                {formatMarathiDate(report.date)}
              </CardDescription>
            </CardHeader>
            {report.insights && (
              <CardContent>
                <p className="text-sm">{report.insights}</p>
              </CardContent>
            )}
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {report.positions.map((position) => (
              <PlanetCard key={position.planet} position={position} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
