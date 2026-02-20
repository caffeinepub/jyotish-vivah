# Specification

## Summary
**Goal:** Add a Panchang (Hindu almanac) information page to display daily astrological data including Tithi, Nakshatra, Yoga, Karana, and astronomical timings.

**Planned changes:**
- Create backend function to calculate and return panchang data for a given date
- Add Marathi translations for all panchang-related terms (Tithi names, Nakshatra names, Yoga names, Karana names)
- Create PanchangCard component to display panchang information in traditional Indian astrology theme
- Add new Panchang page route with navigation menu link
- Create React Query hooks for fetching panchang data from backend

**User-visible outcome:** Users can navigate to a new Panchang page showing today's Hindu almanac information displayed in Marathi, including lunar day, constellation, yoga, karana, and sunrise/sunset/moonrise/moonset times, all styled consistently with the existing traditional astrology theme.
