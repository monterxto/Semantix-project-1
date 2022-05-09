import xml2js from 'xml2js';

export const xml2json = async (xml: string): Promise<any> => {
  const parser = new xml2js.Parser();
  const json = parser.parseStringPromise(xml);
  return json;
}