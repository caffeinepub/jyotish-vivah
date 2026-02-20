import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Time "mo:core/Time";

module {
  type AstroPerson = {
    name : Text;
    dateOfBirth : Text;
    timeOfBirth : ?Text;
    placeOfBirth : ?Text;
  };

  type CompatibilityResult = {
    person1 : AstroPerson;
    person2 : AstroPerson;
    score : Float;
    details : Text;
    timestamp : Time.Time;
    isFavorable : Bool;
  };

  type PlanetPosition = {
    planet : Text;
    sign : Text;
    degree : Float;
    retrograde : Bool;
  };

  type DailyPlanetaryReport = {
    date : Text;
    positions : [PlanetPosition];
    insights : Text;
    createdBy : Principal;
    timestamp : Time.Time;
  };

  type PanchangDay = {
    dayNumber : Int;
    tithi : Text;
    nakshatra : Text;
    yoga : Text;
    karana : Text;
    sunriseTime : Text;
    sunsetTime : Text;
    moonriseTime : Text;
    moonsetTime : Text;
  };

  type OldActor = {
    compatibilities : Map.Map<Principal, List.List<CompatibilityResult>>;
    dailyReports : Map.Map<Text, DailyPlanetaryReport>;
  };

  type NewActor = {
    compatibilities : Map.Map<Principal, List.List<CompatibilityResult>>;
    dailyReports : Map.Map<Text, DailyPlanetaryReport>;
  };

  public func run(old : OldActor) : NewActor {
    {
      compatibilities = old.compatibilities;
      dailyReports = old.dailyReports;
    };
  };
};
