export interface wayakuObject {
  wayaku: {
    ['@_fileID']: string; //wayakuFile-<UUID>
    h1: {
      ['#text']: string;
    };
    section: {
      ['@_sectionID']: string; //section-<UUID>
      p: [
        {
          ['#text']: string;
          ['@_class']: 'en';
        },
        {
          ['#text']: string;
          ['@_class']: 'ja';
        }
      ];
    }[];
  };
}
