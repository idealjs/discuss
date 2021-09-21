import { NextApiRequest, NextApiResponse } from "next";

class Service {
  private req;
  private res;
  constructor(config: { req: NextApiRequest; res: NextApiResponse }) {
    this.req = config.req;
    this.res = config.res;
  }
  public hooks(config: {
    get?: <D>() => PromiseLike<D>;
    create?: <D>() => PromiseLike<D>;
    update?: <D>() => PromiseLike<D>;
    remove?: <D>() => PromiseLike<D>;
  }) {}
}

export default Service;
