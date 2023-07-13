const proxyConfigMappings = {
  dev: {
    prefix: '/api',
    target: 'http://localhost:8009',
  },
  test: {
    prefix: '/api',
    target: 'http://localhost:8080',
  },
  prod: {
    prefix: '/api',
    target: 'http://localhost:8080',
  },
  ai: {
    prefix: '/api',
    target: 'http://localhost:8010',
  }
}

export function getProxyConfig(envType = 'dev') {
  return proxyConfigMappings[envType]
}


export function getAiConfig(envType = 'ai') {
  return proxyConfigMappings[envType]
}
