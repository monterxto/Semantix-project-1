import https from "https";
import { address, contact, user } from "@/domain/user/https/semantix/types";
import { ISemantixHttp } from "@/domain/user/https/semantix/semantix-http.interface";
import { xml2json } from "../../utils";

export class SemantixHttp implements ISemantixHttp {
  private options: any;

  constructor(options: any) {
    this.options = options;
  }

  public async users(page: number): Promise<user[]> {
    await this.sleep();
    return new Promise<user[]>((resolve, reject) => {
      https
        .get(
          { ...this.options, path: `/v1/users?limit=10&page=${page}` },
          (res) => {
            let data: string;
            res.on("data", (d) => {
              data = d.toString();
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
                let users;
                try {
                  users = (await xml2json(data)).data.usersList[0].item;
                } catch (error) {
                  reject(new Error(`data: ${data}`));
                }
                resolve(users);
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

  public async address(userId: string): Promise<address[]> {
    await this.sleep();
    return new Promise<address[]>((resolve, reject) => {
      https
        .get(
          { ...this.options, path: `/v1/users/${userId}/address` },
          (res) => {
            let data: string;
            res.on("data", (d) => {
              data = d.toString();
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
                let address;
                try {
                  address = (await xml2json(data)).data.item;
                } catch (error) {
                  reject(new Error(`data: ${data}`));
                }
                resolve(address);
              }
            });
          }
        )
        .on("error", (e) => {
          reject(e);
        })
        .end();
    });
  }

  public async contacts(userId: string): Promise<contact[]> {
    await this.sleep();
    return new Promise<contact[]>((resolve, reject) => {
      https
        .get(
          { ...this.options, path: `/v1/users/${userId}/contacts` },
          (res) => {
            let data: string;
            res.on("data", (d) => {
              data = d.toString();
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
                let contacts;
                try {
                  contacts = (await xml2json(data)).data.item;
                } catch (error) {
                  reject(new Error(`data: ${data}`));
                }
                resolve(contacts);
              }
            });
          }
        )
        .on("error", (e) => {
          reject(e);
        })
        .end();
    });
  }

  public async sleep(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
}
