export interface BirdInfo {
  birdName: string;
  birdCode: string;
  euring: string;
  ringingData: RingingData;
  birdData: BirdData;
  observationTime: ObservationTime;
  observationPlace: ObservationPlace;
}

interface RingingData {
  ringingScheme: string;
  primaryIdentificationMethod: string;
  identificationRing: string;
  series: string;
  dots: string;
  number: string;
  ringVerification: number;
  metalRingInfo: number;
  otherRingsInfo: number;
  typeByInfo: {
    code: string;
    name: string;
  };
  typeByRingingSchema: {
    code: string;
    name: string;
  };
  birdManimupations: string;
}

interface BirdData {
  typeByInfo: string;
  sex: string;
  sexByRingingSchema: string;
  ageByInfo: number;
  ageByRingingSchema: number;
  birdStatus: string;
  layingSizze: string;
  chickSize: string;
}

interface ObservationTime {
  ringNumber: string;
  dateAccuracy: string;
  time: {
    hours: number;
    minutes: number;
  };
}

interface ObservationPlace {
  placeCode: string;
  latitude: string;
  longitude: string;
  coordAccuracy: string;
}
