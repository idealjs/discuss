import { Readable, Writable } from "stream";

interface IRequest extends Readable {}

interface IResponse extends Writable {}

type Middleware = (
  req: IRequest,
  res: IResponse
) => PromiseLike<{ req: IRequest; res: IResponse }>;

interface IConfig {
  middlewares?: Middleware[];
}

class App<Req, Res> {
  private middlewares: Middleware[] = [];
  constructor(config?: IConfig) {
    const { middlewares } = config || {};
    if (middlewares != null) this.middlewares = middlewares;
  }
  listener(req: Readable, res: Writable) {
    this.middlewares.reduce(
      async (p, c, i) => {
        return await c(p.req, p.res);
      },
      { req, res }
    );
  }
}

export default App;
