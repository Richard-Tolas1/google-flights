export interface Airport {
  skyId: string;
  entityId: string;
  presentation: Presentation[];
  navigation: Navigation;
}

interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

interface Navigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: relevantFlightParams[];
  relevantHotelParams: relevantHotelParams[];
}

interface relevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

interface relevantHotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}
