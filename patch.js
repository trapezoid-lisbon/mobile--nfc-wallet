const fs = require('fs/promises');
async function fixBrowserCheck(path) {
  const vueRuntimeDom = await fs.readFile(path, {encoding: 'utf8'});
  const fixedVueRuntimeDom = vueRuntimeDom
    .replaceAll(
      "typeof window !== 'undefined'",
      "typeof window !== 'undefined' && typeof document !== 'undefined'",
    )
    .replaceAll(
      '"undefined"!=typeof window',
      '"undefined"!=typeof window && "undefined"!==typeof document',
    );
  await fs.writeFile(path, fixedVueRuntimeDom);
}
(async () => {
  //Fix solana
  const solanaWeb3Package = await fs.readFile(
    'node_modules/@solana/web3.js/package.json',
    {encoding: 'utf8'},
  );
  const fixedSolanaWeb3Package = solanaWeb3Package.replaceAll(
    './lib/index.browser.cjs.js',
    './lib/index.cjs.js',
  );
  await fs.writeFile(
    'node_modules/@solana/web3.js/package.json',
    fixedSolanaWeb3Package,
  );

  //FIX TCP
  const tcpPackage = await fs.readFile(
    'node_modules/react-native-tcp/android/build.gradle',
    {encoding: 'utf8'},
  );
  const fixedTcpPackage = tcpPackage.replaceAll('compile ', 'implementation ');
  await fs.writeFile(
    'node_modules/react-native-tcp/android/build.gradle',
    fixedTcpPackage,
  );

  //Fix xmlhttprequest file
  const xmlHttpRequestFile = await fs.readFile(
    'node_modules/xmlhttprequest/lib/XMLHttpRequest.js',
    {encoding: 'utf8'},
  );
  const fixedXmlHttpRequestFile = xmlHttpRequestFile.replaceAll(
    'var spawn = require("child_process").spawn;',
    'var spawn = () => {}',
  );
  await fs.writeFile(
    'node_modules/xmlhttprequest/lib/XMLHttpRequest.js',
    fixedXmlHttpRequestFile,
  );

  //Fix ZLIB FILE
  const zLibFile = await fs.readFile(
    'node_modules/@eth-optimism/core-utils/dist/optimism/batch-encoding.js',
    {encoding: 'utf8'},
  );
  const fixedZLibFile = zLibFile.replaceAll(
    'const zlib_1 = __importDefault(require("zlib"));',
    'const zlib_1 = () => {}',
  );
  await fs.writeFile(
    'node_modules/@eth-optimism/core-utils/dist/optimism/batch-encoding.js',
    fixedZLibFile,
  );

  //FIX OSPACKAGE
  const osPackage = await fs.readFile(
    'node_modules/react-native-os/android/build.gradle',
    {encoding: 'utf8'},
  );
  const fixedOSPackage = osPackage.replaceAll('compile ', 'implementation ');
  await fs.writeFile(
    'node_modules/react-native-os/android/build.gradle',
    fixedOSPackage,
  );

  //Fix Vue JSX conflict with react-native jsx
  const vueJsxTypeDef = await fs.readFile('node_modules/vue/types/jsx.d.ts', {
    encoding: 'utf8',
  });
  const fixVueJsxTypeDef = vueJsxTypeDef.replaceAll('JSX', 'JSX_NOT_REQUIRED');
  await fs.writeFile('node_modules/vue/types/jsx.d.ts', fixVueJsxTypeDef);

  try {
    await fs.rename(
      'node_modules/superstruct/lib/index.cjs',
      'node_modules/superstruct/lib/index.cjs.js',
    );
  } catch (e) {
    //Ignore error
    //console.log('node_modules/superstruct/lib/index.cjs', 'already renamed?')
  }

  await fixBrowserCheck('node_modules/vue/dist/vue.runtime.common.dev.js');
  await fixBrowserCheck('node_modules/vue/dist/vue.runtime.common.prod.js');
})();
