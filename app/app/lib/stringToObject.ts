import { XMLParser } from 'fast-xml-parser';
import { wayakuObject } from '../../../@types/wayakuObjectType';

/**
 *
 * @param wayakuData
 * @returns
 */
export function stringToObject(wayakuData: string): wayakuObject {
  if (!wayakuData) return;
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
  });
  return parser.parse(wayakuData) as wayakuObject;
}
