const proxyConfigMappings = {
  dev: {
    prefix: '/api',
    // target: 'http://127.0.0.1:8009/',
    target: 'http://nps.minsir.com:8009/',
  },
  test: {
    prefix: '/api',
    target: 'http://10.105.131.130:8009',
  },
  prod: {
    prefix: '/api',
    target: 'http://localhost:8080',
  },
  ai: {
    prefix: '/api',
    target: 'http://nps.minsir.com:8010',
  }
}

export function getProxyConfig(envType = 'dev') {
  return proxyConfigMappings[envType]
}


export function getAiConfig(envType = 'ai') {
  return proxyConfigMappings[envType]
}
