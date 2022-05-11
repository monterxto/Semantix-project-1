import https from "https";
import fs from "fs";
import FormData from "form-data";
import { IGoFileHttp } from "@/domain/user/https/gofile/gofile-http.interface";
import { folderList, folder, server } from "@/domain/user/https/gofile/types";
import { URLSearchParams } from "url";
import path from "path";

export class GofileHttp implements IGoFileHttp {
  private options: any;

  constructor(options: any) {
    this.options = options;
  }

  public async getContent(id: string): Promise<folderList> {
    return new Promise<folderList>((resolve, reject) => {
      https
        .get(
          {
            ...this.options,
            path: `/getContent?token=${process.env.GOFILE_TOKEN}&contentId=${id}&websiteToken=${process.env.GOFILE_WEBSITE_TOKEN}`,
          },
          (res) => {
            let data: string = "";
            res.on("data", (d) => {
              data += d.toString();
            });
            res.on("error", (e) => {
              reject(e);
            });
            res.on("end", async () => {
              if (res.statusCode !== 200) {
                reject(
                  new Error(`Status code: ${res.statusCode}, data: ${data}`)
                );
              } else {
                const responseJson = JSON.parse(data);
                resolve(responseJson);
              }
            });
          }
        )
        .end()
        .on("error", (e) => {
          reject(e);
        });
    });
  }

  public async createFolder(
    parentFolderId: string,
    name: string
  ): Promise<folder> {
    const requestBody = new URLSearchParams({
      parentFolderId: parentFolderId,
      folderName: name,
      token: process.env.GOFILE_TOKEN,
    }).toString();

    return new Promise<folder>((resolve, reject) => {
      const req = https.request(
        {
          ...this.options,
          path: `/createFolder`,
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": requestBody.length,
          },
        },
        (res) => {
          let data: string = "";
          res.on("data", (d) => {
            data += d.toString();
          });
          res.on("error", (e) => {
            reject(e);
          });
          res.on("end", async () => {
            if (res.statusCode !== 200) {
              reject(
                new Error(`Status code: ${res.statusCode}, data: ${data}`)
              );
            } else {
              const responseJson = JSON.parse(data);
              resolve(responseJson);
            }
          });
        }
      );
      req.write(requestBody);
      req.end();
      req.on("error", (e) => {
        reject(e);
      });
    });
  }

  public async getServer(): Promise<server> {
    return new Promise<server>((resolve, reject) => {
      https
        .get(
          {
            ...this.options,
            path: `/getServer`,
          },
          (res) => {
            let data: string = "";
            res.on("data", (d) => {
              data += d.toString();
            });
            res.on("error", (e) => {
              reject(e);
            });
            res.on("end", async () => {
              if (res.statusCode !== 200) {
                reject(
                  new Error(`Status code: ${res.statusCode}, data: ${data}`)
                );
              } else {
                const responseJson = JSON.parse(data);
                resolve(responseJson);
              }
            });
          }
        )
        .end()
        .on("error", (e) => {
          reject(e);
        });
    });
  }

  public async uploadFile(
    folderId: string,
    file: any,
    serverHost: string,
    fileName: string
  ): Promise<void> {
    const form = new FormData();
    form.append("file", file, { filename: fileName });
    form.append("folderId", folderId);
    form.append("token", process.env.GOFILE_TOKEN);
    new Promise((resolve, reject) => {
      let req = https.request(
        {
          hostname: this.options.hostname.replace("api", serverHost),
          path: `/uploadFile`,
          method: "POST",
          headers: form.getHeaders(),
        },
        (res) => {
          let data: string = "";
          res.on("data", (d) => {
            data += d.toString();
          });
          res.on("error", (e) => {
            reject(e);
          });
          res.on("end", async () => {
            if (res.statusCode !== 200) {
              reject(
                new Error(`Status code: ${res.statusCode}, data: ${data}`)
              );
            } else {
              data = JSON.parse(data);
              resolve(data);
            }
          });
        }
      );
      form.pipe(req);
      req.on("error", (e) => {
        reject(e);
      });
      req.end();
    });
  }
}
