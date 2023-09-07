'use client';
import React from 'react';
import { wayakuObject } from '../../../@types/wayakuObjectType';

export function FileHeader({
  isEditing,
  fileContent,
  setFileContent,
}: {
  isEditing: boolean;
  fileContent: wayakuObject;
  setFileContent: (arg0: wayakuObject) => void;
}): React.ReactNode {
  return (
    <>
      <h1 className="">
        {isEditing ? (
          <>
            <input
              className="w-full border"
              type="text"
              defaultValue={fileContent.wayaku.h1['#text']}
              onChange={(e) => {
                setFileContent({
                  ...fileContent,
                  wayaku: {
                    ...fileContent.wayaku,
                    h1: {
                      ...fileContent.wayaku.h1,
                      '#text': e.target.value,
                    },
                  },
                });
              }}
            />
          </>
        ) : (
          <>{fileContent.wayaku.h1['#text']}</>
        )}
      </h1>
    </>
  );
}
