import React from 'react';
import { SkyscraperBuilding } from './SkyscraperBuilding';
import { ApartmentBuilding } from './ApartmentBuilding';
import { HouseBuilding } from './HouseBuilding';

/**
 * Building Router Component
 * Routes to specific building type components
 */
export function Building({ position, type, numFloors, scroll, startScroll, endScroll }) {
  const props = { position, numFloors, scroll, startScroll, endScroll };
  
  switch(type) {
    case 'skyscraper':
      return <SkyscraperBuilding {...props} />;
    case 'apartment':
      return <ApartmentBuilding {...props} />;
    case 'house':
      return <HouseBuilding {...props} />;
    default:
      return <SkyscraperBuilding {...props} />;
  }
}
