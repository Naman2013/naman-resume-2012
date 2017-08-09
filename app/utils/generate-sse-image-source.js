export default function generateSseImageSource(teleSystem) {
  // see webpack.config devServer proxies
  // example https://mars.slooh.com/sse/${teleSystem}
  return `/dev-sse/sse/${teleSystem}`;
}
