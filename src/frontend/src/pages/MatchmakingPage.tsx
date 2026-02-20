import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BirthDetailsForm from '@/components/BirthDetailsForm';
import CompatibilityResults from '@/components/CompatibilityResults';
import { useMatchmaking } from '@/hooks/useMatchmaking';
import { marathiStrings } from '@/i18n/marathi';
import type { AstroPerson } from '@/backend';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function MatchmakingPage() {
  const [person1, setPerson1] = useState<AstroPerson | null>(null);
  const [person2, setPerson2] = useState<AstroPerson | null>(null);
  const { saveCompatibility, recentCompatibilities, isLoading } = useMatchmaking();

  const handleCalculate = async () => {
    if (!person1 || !person2) return;

    // Simple compatibility calculation (in real app, this would be more complex)
    const score = Math.random() * 36; // Guna Milan out of 36
    const isFavorable = score >= 18;
    const details = `गुण मिलान: ${score.toFixed(1)}/36\n\nयोग्यता विश्लेषण:\n- वर्ण: ${(Math.random() * 1).toFixed(1)}/1\n- वश्य: ${(Math.random() * 2).toFixed(1)}/2\n- तारा: ${(Math.random() * 3).toFixed(1)}/3\n- योनी: ${(Math.random() * 4).toFixed(1)}/4\n- ग्रह मैत्री: ${(Math.random() * 5).toFixed(1)}/5\n- गण: ${(Math.random() * 6).toFixed(1)}/6\n- भकूट: ${(Math.random() * 7).toFixed(1)}/7\n- नाडी: ${(Math.random() * 8).toFixed(1)}/8`;

    await saveCompatibility(person1, person2, score, details, isFavorable);
  };

  const canCalculate = person1 && person2;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-saffron mb-2">
          {marathiStrings.matchmaking.title}
        </h1>
        <p className="text-muted-foreground">{marathiStrings.matchmaking.subtitle}</p>
      </div>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="new">{marathiStrings.matchmaking.newMatch}</TabsTrigger>
          <TabsTrigger value="history">{marathiStrings.matchmaking.history}</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{marathiStrings.matchmaking.person1}</CardTitle>
                <CardDescription>{marathiStrings.matchmaking.enterDetails}</CardDescription>
              </CardHeader>
              <CardContent>
                <BirthDetailsForm onSubmit={setPerson1} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{marathiStrings.matchmaking.person2}</CardTitle>
                <CardDescription>{marathiStrings.matchmaking.enterDetails}</CardDescription>
              </CardHeader>
              <CardContent>
                <BirthDetailsForm onSubmit={setPerson2} />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleCalculate}
              disabled={!canCalculate || isLoading}
              className="bg-saffron hover:bg-saffron/90 text-white"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {marathiStrings.matchmaking.calculate}
            </Button>
          </div>

          {recentCompatibilities && recentCompatibilities.length > 0 && (
            <CompatibilityResults result={recentCompatibilities[0]} />
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {recentCompatibilities && recentCompatibilities.length > 0 ? (
            recentCompatibilities.map((result, index) => (
              <CompatibilityResults key={index} result={result} />
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                {marathiStrings.matchmaking.noHistory}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
