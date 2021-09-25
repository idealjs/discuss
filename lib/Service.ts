import { Tag } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
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
    get?: () => PromiseLike<R[]>;
    create?: () => PromiseLike<R>;
    update?: () => PromiseLike<R>;
    remove?: () => PromiseLike<R>;
  }) {
    if (this.permissions != null) {
    }
    console.debug("[debug]", this.req.method);
    const { get, create, update, remove } = config;
    switch (this.req.method) {
      case "GET":
        if (get != null) {
          if (this.permissions != null && this.permissions.get != null) {
          } else {
            const session = await getSession({ req: this.req });
            const token = await getToken({ req: this.req, secret: jwtSecret });
            console.log(session, token);
            const r = get();
            this.res.status(200).json(r);
          }
        }
        break;
      case "POST":
        if (create != null) {
          const r = create();
          this.res.status(200).json(r);
        }
        break;
      case "PUT":
        if (update != null) {
          const r = update();
          this.res.status(200).json(r);
        }
        break;
      case "DELETE":
        if (remove != null) {
          const r = remove();
          this.res.status(200).json(r);
        }
        break;
      default:
        this.res.status(404);
        break;
    }
  }
}

export default Service;
