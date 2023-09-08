import { XMLBuilder } from 'fast-xml-parser';
import { wayakuObject } from '../../../@types/wayakuObjectType';

export function objectToString(wayakuObject: wayakuObject): string {
  if (!wayakuObject) return;
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  return builder.build(wayakuObject);
}
