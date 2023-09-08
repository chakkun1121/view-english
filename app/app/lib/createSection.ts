'use client';
import { sectionType } from '../../../@types/wayakuObjectType';
import { v4 as createUUID } from 'uuid';

export function createSection(): sectionType {
  return {
    '@_sectionID': ('section' + createUUID()) as string,
    p: [
      {
        '#text': '',
        '@_class': 'en',
      },
      {
        '#text': '',
        '@_class': 'ja',
      },
    ],
  };
}
