export interface Flights {
  context: Context;
  itineraries: Itineraries[];
}

interface Context {
  status: string;
  sessionId: string;
}

export interface Itineraries {
  id: string;
  price: Price;
  legs: Legs[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  eco: Eco;
  fareAttributes: {};
  tags: string;
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
  pricingOptions: PricingOptions;
}

interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

interface Legs {
  id: string;
  origin: Origin;
  destination: Destination;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: number;
  departure: string;
  arrival: string;
  timeDeltaInDays: string;
  carriers: {
    marketing: Marketing[];
    operationType: string;
  };
  segments: Segments[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
}

interface Origin {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  isHighlighted: boolean;
}

interface Destination {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  isHighlighted: boolean;
}

interface Marketing {
  id: number;
  logoUrl: string;
  name: string;
}

interface Segments {
  id: string;
  origin: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: string;
    };
    name: string;
    type: string;
    country: string;
  };
  destination: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: string;
    };
    name: string;
    type: string;
    country: string;
  };
  departure: string;
  arrival: string;
  durationInMinutes: string;
  flightNumber: string;
  marketingCarrier: {
    id: number;
    name: string;
    alternateId: string;
    allianceId: number;
    displayCode: string;
  };
  operatingCarrier: {
    id: number;
    name: string;
    alternateId: string;
    allianceId: number;
    displayCode: string;
  };
}

interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

interface Eco {
  ecoContenderDelta: number;
}

interface PricingOptions {
  agentIds: string;
  price: {
    updateStatus: string;
    amount: number;
  };
  segmentIds: {
    bookingProposition: string;
    agentId: string;
    url: string;
    pricingOptionId: string;
  };
}
