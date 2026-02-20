import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PlanetPosition } from '@/backend';
import { getPlanetNameMarathi, getZodiacSignMarathi } from '@/utils/marathiTranslations';
import { Orbit } from 'lucide-react';

interface PlanetCardProps {
  position: PlanetPosition;
}

export default function PlanetCard({ position }: PlanetCardProps) {
  const planetNameMarathi = getPlanetNameMarathi(position.planet);
  const zodiacSignMarathi = getZodiacSignMarathi(position.sign);

  return (
    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-saffron">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Orbit className="h-5 w-5 text-saffron" />
            {planetNameMarathi}
          </CardTitle>
          {position.retrograde && (
            <Badge variant="destructive" className="text-xs">
              वक्री
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">राशी:</span>
          <span className="font-semibold text-deepGold">{zodiacSignMarathi}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">अंश:</span>
          <span className="font-semibold">{position.degree.toFixed(2)}°</span>
        </div>
      </CardContent>
    </Card>
  );
}
