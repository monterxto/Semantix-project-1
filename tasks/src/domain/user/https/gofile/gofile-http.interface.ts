import { folder, folderList, server } from "./types";

export interface IGoFileHttp {
  getContent(id: string): Promise<folderList>;
  createFolder(parentFolderId: string, name: string): Promise<folder>;
  getServer(): Promise<server>;
  uploadFile(folderId: string, file: Buffer, serverHost: string, fileName: string): Promise<void>;
}
