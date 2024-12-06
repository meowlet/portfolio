import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const config = {
  images: {
    domains: ["images.unsplash.com", "picsum.photos"],
  },
};

export default withNextIntl(config);
