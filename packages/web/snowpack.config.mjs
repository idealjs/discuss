/** @type {import("snowpack").SnowpackUserConfig } */

const cofig = {
  mount: {
    /* ... */
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  exclude: ["packages/server"],
};

export default cofig;
