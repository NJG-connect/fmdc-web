import call from './call.json';
// global.fetch = newfetch;

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export async function fakeFetch(
  url: string,
  methode: Method,
  body?: Object,
  params?: { ignoreBaseURL?: string; delay?: number },
): Promise<any> {
  const objForResponse: any = { ...call };
  url = url.toLowerCase();

  // ignore start of url
  if (params && params.ignoreBaseURL) {
    url = url.split(params.ignoreBaseURL)[1] || url;
  }
  const method: string = methode.toLowerCase();

  // sleep for do like a fetch
  if (params && params.delay) {
    await sleep(params.delay);
  }
  return new Promise((resolve, reject) => {
    if (objForResponse && Object.keys(call).includes(url)) {
      if (objForResponse[url][method]) {
        return resolve(objForResponse[url][method]);
      }
      return reject(`Pas de méthode ${method} pour cette route`);
    }
    return reject(`Pas de routes crée pour l'url : ${url}`);
  });
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
