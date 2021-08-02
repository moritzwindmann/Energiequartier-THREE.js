# Energiequartier-THREE.js

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
Test

## Fragen

- Wofür werden jeweils die `.bin` und `.gltf` dateien gebraucht?
* gltf und bin werden beide benötigt da hier die scene gespeichert ist. GLZF vergibt die ganzen materialien und die Polygone sind in der Bin. LAngfristig wird es aber eine Datei die mit Draco komprimiert wird.
- Können wir die blender datei in git hochladen..?
* versuchen wir einfach liegt unter resources