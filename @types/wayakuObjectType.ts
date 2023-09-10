export interface wayakuObject {
  wayaku: {
    ['@_fileID']: string; //wayakuFile-<UUID>
    h1: {
      class: 'title';
      ['#text']: string;
    };
    section: sectionType[];
  };
}
export interface sectionType {
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
}
