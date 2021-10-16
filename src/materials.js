/**
 * Textures
 */
function myFunction() {
  const textureLoader = new THREE.TextureLoader();

  const roofTexture = textureLoader.load(
    "/textures/matcaps/B3AA93_F4EFD7_E1DDC2_DCD3BB-256px.png"
  );
  const wallTexture = textureLoader.load(
    "/textures/matcaps/B5BBB5_3B4026_6E745D_5C6147-256px.png"
  );
  const treeTexture = textureLoader.load(
    "/textures/matcaps/37C337_279F27_186018_248824-256px.png"
  );
  // const waterTexture = textureLoader.load('/textures/matcaps/597C3F_254319_6C9668_7C9B53-256px.png')

  roofTexture.minFilter = THREE.NearestFilter;
  roofTexture.magFilter = THREE.NearestFilter;
  roofTexture.generateMipmaps = false;
}
