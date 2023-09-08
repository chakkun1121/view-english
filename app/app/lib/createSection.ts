'use client';
import { sectionType } from '../../../@types/wayakuObjectType';
import { v4 as createUUID } from 'uuid';

export function createSection(enText?: string, jaText?: string): sectionType {
  return {
    '@_sectionID': ('section' + createUUID()) as string,
    p: [
      {
        '#text': enText || '',
        '@_class': 'en',
      },
      {
        '#text': jaText || '',
        '@_class': 'ja',
      },
    ],
  };
}
