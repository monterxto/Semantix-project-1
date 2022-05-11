export type folderList = {
  data: {
    contents: { [key: string]: folderInList };
  };
};

export type folderInList = {
  id: string;
  name: string;
};

export type folder = {
  data: folderInList;
};

export type server = {
  data: {
    server: string;
  };
};
