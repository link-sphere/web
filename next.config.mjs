import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, //이미지 최적화 비활성화
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
