import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import List "mo:core/List";
import Float "mo:core/Float";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Types
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

  // Persistent Storage
  let compatibilities = Map.empty<Principal, List.List<CompatibilityResult>>();
  let dailyReports = Map.empty<Text, DailyPlanetaryReport>();

  // Modules for Comparison Functions
  module CompatibilityResult {
    public func compare(a : CompatibilityResult, b : CompatibilityResult) : Order.Order {
      Float.compare(b.score, a.score);
    };
  };

  // Functions
  public shared ({ caller }) func saveCompatibilityResult(
    person1 : AstroPerson,
    person2 : AstroPerson,
    score : Float,
    details : Text,
    isFavorable : Bool,
  ) : async () {
    let result : CompatibilityResult = {
      person1;
      person2;
      score;
      details;
      timestamp = Time.now();
      isFavorable;
    };

    let existingResults = switch (compatibilities.get(caller)) {
      case (null) { List.empty<CompatibilityResult>() };
      case (?results) { results };
    };

    existingResults.add(result);

    let sortedResults = List.fromArray<CompatibilityResult>(existingResults.toArray().sort());

    compatibilities.add(caller, sortedResults);
  };

  public query ({ caller }) func getRecentCompatibilities(limit : Nat) : async [CompatibilityResult] {
    switch (compatibilities.get(caller)) {
      case (null) { [] };
      case (?results) {
        let resultsList = results.toArray();
        let size = if (resultsList.size() < limit) { resultsList.size() } else { limit };
        resultsList.sliceToArray(0, size);
      };
    };
  };

  public shared ({ caller }) func addDailyReport(
    date : Text,
    positions : [PlanetPosition],
    insights : Text,
  ) : async () {
    let report : DailyPlanetaryReport = {
      date;
      positions;
      insights;
      createdBy = caller;
      timestamp = Time.now();
    };

    dailyReports.add(date, report);
  };

  public query ({ caller }) func getDailyReport(date : Text) : async DailyPlanetaryReport {
    switch (dailyReports.get(date)) {
      case (null) { Runtime.trap("Report not found") };
      case (?report) { report };
    };
  };

  public query ({ caller }) func getPanchangData(dayNumber : Int) : async PanchangDay {
    let allTithis : [Text] = [
      "Pratipada",
      "Dwitiya",
      "Tritiya",
      "Chaturthi",
      "Panchami",
      "Shashthi",
      "Saptami",
      "Ashtami",
      "Navami",
      "Dashami",
      "Ekadashi",
      "Dwadashi",
      "Trayodashi",
      "Chaturdashi",
      "Purnima/Amavasya",
    ];

    let allNakshatras : [Text] = [
      "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
      "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
      "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
      "Uttara Bhadrapada", "Revati",
    ];

    let allYogas : [Text] = [
      "Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", "Shoola",
      "Ganda", "Vruddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyana", "Parigha",
      "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti",
    ];

    let allKaranas : [Text] = [
      "Bava", "Balava", "Kaulava", "Taitila", "Garaja", "Vanija", "Vishti", "Shakuni", "Chatushpad", "Naga", "Kimastūgha",
    ];

    func safeIndex(array : [Text], index : Int) : Text {
      if (index >= 0 and index < array.size().toInt()) {
        array[0];
      } else {
        array[index.toNat()];
      };
    };

    let tithiIndex = (dayNumber - 1) % allTithis.size().toInt();
    let tithi = switch (dayNumber % 30) {
      case (0) {
        if ((dayNumber / 30) % 2 == 0) { "Purnima" } else {
          "Amavasya";
        };
      };
      case (_) {
        safeIndex(allTithis, tithiIndex);
      };
    };

    let nakshatraIndex = (dayNumber - 1) % allNakshatras.size().toInt();
    let nakshatra = safeIndex(allNakshatras, nakshatraIndex);

    let yogaIndex = (dayNumber - 1) % allYogas.size().toInt();
    let yoga = safeIndex(allYogas, yogaIndex);

    let karanaIndex = (dayNumber - 1) % allKaranas.size().toInt();
    let karana = safeIndex(allKaranas, karanaIndex);

    let panchangDay : PanchangDay = {
      dayNumber;
      tithi;
      nakshatra;
      yoga;
      karana;
      sunriseTime = "06:00 AM";
      sunsetTime = "06:00 PM";
      moonriseTime = "08:00 PM";
      moonsetTime = "06:00 AM";
    };

    panchangDay;
  };
};
