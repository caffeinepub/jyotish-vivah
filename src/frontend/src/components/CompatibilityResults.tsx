import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CompatibilityResult } from '@/backend';
import { marathiStrings } from '@/i18n/marathi';
import { Heart, HeartCrack } from 'lucide-react';

interface CompatibilityResultsProps {
  result: CompatibilityResult;
}

export default function CompatibilityResults({ result }: CompatibilityResultsProps) {
  const isFavorable = result.isFavorable;

  return (
    <Card className={`border-l-4 ${isFavorable ? 'border-l-green-500' : 'border-l-yellow-500'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-2">
            {isFavorable ? (
              <Heart className="h-6 w-6 text-green-500 fill-green-500" />
            ) : (
              <HeartCrack className="h-6 w-6 text-yellow-500" />
            )}
            {marathiStrings.matchmaking.compatibilityResult}
          </CardTitle>
          <Badge variant={isFavorable ? 'default' : 'secondary'} className="text-lg px-4 py-1">
            {result.score.toFixed(1)}/36
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{marathiStrings.matchmaking.person1}</p>
            <p className="font-semibold">{result.person1.name}</p>
            <p className="text-sm">{result.person1.dateOfBirth}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{marathiStrings.matchmaking.person2}</p>
            <p className="font-semibold">{result.person2.name}</p>
            <p className="text-sm">{result.person2.dateOfBirth}</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-2">{marathiStrings.matchmaking.detailedAnalysis}</h4>
          <div className="bg-muted/50 p-4 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap font-sans">{result.details}</pre>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Badge variant={isFavorable ? 'default' : 'secondary'} className="text-base px-4 py-2">
            {isFavorable ? marathiStrings.matchmaking.favorable : marathiStrings.matchmaking.unfavorable}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
