module.exports = {
  images: {
    domains: ["avatars.githubusercontent.com", "media-exp1.licdn.com"],
  },
  async redirects() {
    return [
      {
        source: "/signin",
        destination: "/auth/signin",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/auth/signin",
        permanent: true,
      },
      {
        source: "/signout",
        destination: "/auth/signout",
        permanent: true,
      },
      {
        source: "/logout",
        destination: "/auth/signout",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/auth/signup",
        permanent: true,
      },
    ];
  },
};
