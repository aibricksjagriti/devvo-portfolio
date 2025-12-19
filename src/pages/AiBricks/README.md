# AiBricks Page Structure

This folder contains all the code for the AiBricks real estate construction page.

## Folder Structure

```
AiBricks/
├── index.jsx                 # Main page component with Canvas and UI
├── AiBricksScene.jsx         # 3D scene setup and composition
├── colors.js                 # Color palette constants
├── components/               # 3D components
│   ├── Building.jsx          # Complete building with multiple floors
│   ├── BuildingFloor.jsx     # Individual floor with construction animation
│   ├── ConstructionCrane.jsx # Animated construction crane
│   ├── Tree.jsx              # Tree with trunk and foliage
│   ├── Car.jsx               # Moving car with realistic materials
│   ├── Bird.jsx              # Flying bird with wing animation
│   ├── ConstructionDust.jsx  # Particle system for dust
│   ├── Road.jsx              # Road with animated markings
│   └── Landscape.jsx         # Grass and terrain
└── hooks/
    └── useCameraAnimation.js # Camera movement and controls
```

## Component Responsibilities

### `index.jsx`
- Main page wrapper
- Canvas configuration
- HTML overlay with scroll sections
- Internationalization

### `AiBricksScene.jsx`
- Scene composition
- Lighting setup
- Building placement and configuration
- Environment elements coordination

### `colors.js`
- Centralized color palette
- All color constants for materials, lights, etc.
- Easy theme management

### Components
Each 3D component is self-contained with:
- Its own refs and state
- Animation logic
- Material definitions using colors from `colors.js`

### Hooks
- `useCameraAnimation.js`: Handles camera movement based on scroll and mouse input

## Usage

Import the main page component:
```jsx
import AiBricksPage from './pages/AiBricks';
```

## Color Management

All colors are centralized in `colors.js`. To change a color:
```javascript
// colors.js
export const colors = {
  skyscraperBase: '#2a2a3a', // Change this value
  // ...
};
```

## Adding New Buildings

Edit the `buildings` array in `AiBricksScene.jsx`:
```javascript
const buildings = useMemo(() => [
  { 
    type: 'skyscraper',  // 'skyscraper' | 'apartment' | 'house'
    pos: [0, 0, 0],      // [x, y, z] position
    floors: 30,          // number of floors
    start: 0,            // scroll start (0-1)
    end: 0.4             // scroll end (0-1)
  },
  // Add more...
], []);
```

## Performance

- Components use `useMemo` for expensive calculations
- Refs minimize re-renders
- Particle systems are optimized with minimal counts
- Shadow maps are configured for quality/performance balance
