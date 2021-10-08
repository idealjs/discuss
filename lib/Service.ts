import { Tag } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";

import { jwtSecret } from "./config";

interface IPermission {
  enable?: Tag[];
  disable?: Tag[];
}

type Permissions = {
  get?: IPermission;
  create?: IPermission;
  update?: IPermission;
  remove?: IPermission;
};

class Service<R> {
  private req;
  private res;
  private permissions?: Permissions;

  constructor(config: { req: NextApiRequest; res: NextApiResponse }) {
    this.req = config.req;
    this.res = config.res;
  }

  public async setPermissions(
    getPermissions: () => PromiseLike<Permissions> | Permissions
  ) {
    this.permissions = await getPermissions();
  }

  public async hooks(config: {
    find?: (query: NextApiRequestQuery) => PromiseLike<R[]>;
    create?: (data: R) => PromiseLike<R>;
    upsert?: (id: number, data: R) => PromiseLike<R>;
    patch?: (id: number, data: Partial<R>) => PromiseLike<R>;
    remove?: (id: number) => PromiseLike<R>;
  }) {
    if (this.permissions != null) {
    }
    console.debug("[debug]", this.req.method);
    const { find, create, upsert, patch, remove } = config;
    switch (this.req.method) {
      case "GET":
        if (find != null) {
          if (this.permissions != null && this.permissions.get != null) {
            const session = await getSession({ req: this.req });
            const token = await getToken({ req: this.req, secret: jwtSecret });
            console.log("test test", session, token);
          } else {
            const r = find(this.req.query);
            this.res.status(200).json(r);
          }
        }
        return;
      case "POST":
        if (create != null) {
          const r = create(this.req.body);
          this.res.status(200).json(r);
        }
        return;
      case "PUT":
        if (upsert != null) {
          const id: number = this.req.query["id"] || this.req.body["id"];
          if (id == null) {
            this.res.status(400);
            return;
          }
          const r = upsert(id, this.req.body);
          this.res.status(200).json(r);
        }
        return;
      case "PATCH": {
        if (patch != null) {
          const id: number = this.req.query["id"] || this.req.body["id"];
          if (id == null) {
            this.res.status(400);
            return;
          }
          const r = patch(id, this.req.body);
          this.res.status(200).json(r);
        }
        return;
      }
      case "DELETE":
        if (remove != null) {
          const id: number = this.req.query["id"] || this.req.body["id"];
          if (id == null) {
            this.res.status(400);
            return;
          }
          const r = remove(id);
          this.res.status(200).json(r);
        }
        return;
      default:
        this.res.status(404);
        return;
    }
  }
}

export default Service;
