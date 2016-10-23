export default function generateSseImageSource(teleSystem, telePort) {
  // see webpack.config devServer proxies
  // example https://mars.slooh.com:3004/sse/${teleSystem}
  return `/dev-sse/${telePort}/sse/${teleSystem}`;
};
