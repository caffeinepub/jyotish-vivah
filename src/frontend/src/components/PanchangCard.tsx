import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PanchangDay } from '@/backend';
import { getTithiMarathi, getNakshatraMarathi, getYogaMarathi, getKaranaMarathi } from '@/utils/marathiTranslations';
import { marathiStrings } from '@/i18n/marathi';
import { Moon, Star, Sunrise, Sunset } from 'lucide-react';

interface PanchangCardProps {
  panchang: PanchangDay;
}

export default function PanchangCard({ panchang }: PanchangCardProps) {
  const tithiMarathi = getTithiMarathi(panchang.tithi);
  const nakshatraMarathi = getNakshatraMarathi(panchang.nakshatra);
  const yogaMarathi = getYogaMarathi(panchang.yoga);
  const karanaMarathi = getKaranaMarathi(panchang.karana);

  return (
    <div className="space-y-4">
      {/* Main Panchang Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-saffron">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Moon className="h-5 w-5 text-saffron" />
              {marathiStrings.panchang.tithi}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-deepGold">{tithiMarathi}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-deepGold">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-deepGold" />
              {marathiStrings.panchang.nakshatra}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-saffron">{nakshatraMarathi}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-terracotta">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-terracotta">✦</span>
              {marathiStrings.panchang.yoga}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-terracotta">{yogaMarathi}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-saffron">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-saffron">◆</span>
              {marathiStrings.panchang.karana}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-deepGold">{karanaMarathi}</p>
          </CardContent>
        </Card>
      </div>

      {/* Astronomical Timings */}
      <Card className="bg-gradient-to-br from-saffron/10 to-deepGold/10 border-saffron/20">
        <CardHeader>
          <CardTitle className="text-xl">{marathiStrings.panchang.astronomicalTimings}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sunrise className="h-4 w-4 text-saffron" />
                {marathiStrings.panchang.sunriseTime}
              </div>
              <p className="text-lg font-semibold">{panchang.sunriseTime}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sunset className="h-4 w-4 text-terracotta" />
                {marathiStrings.panchang.sunsetTime}
              </div>
              <p className="text-lg font-semibold">{panchang.sunsetTime}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Moon className="h-4 w-4 text-deepGold" />
                {marathiStrings.panchang.moonriseTime}
              </div>
              <p className="text-lg font-semibold">{panchang.moonriseTime}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Moon className="h-4 w-4 text-muted-foreground" />
                {marathiStrings.panchang.moonsetTime}
              </div>
              <p className="text-lg font-semibold">{panchang.moonsetTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
