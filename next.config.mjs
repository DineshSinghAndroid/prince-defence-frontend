/** @type {import('next').NextConfig} */

const cspValue = [
    "default-src 'self'",
    "img-src 'self' data: blob: https://res.cloudinary.com https://i.ytimg.com https://images.unsplash.com https://www.google.com https://lh3.googleusercontent.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://app.coachingsinsikar.com",
    `connect-src 'self' http://localhost:5000 http://127.0.0.1:5000 https://api.princedefence.com https://princedefence.com https://www.princedefence.com https://admin.princedefence.com ${(() => { try { return new URL(process.env.NEXT_PUBLIC_API_URL).origin; } catch { return ""; } })()} https://res.cloudinary.com`,
    "frame-src 'self' https://www.youtube.com https://www.google.com https://app.coachingsinsikar.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://wa.me",
    "report-uri /api/csp-report",
].join("; ");

const nextConfig = {
    compress: true,
    poweredByHeader: false,
    experimental: {
        optimizePackageImports: ["lucide-react", "react-icons"],
    },
    images: {
        formats: ["image/avif", "image/webp"],

        qualities: [30, 40,45, 55, 70, 75, 85, 90, 95, 100],

        deviceSizes: [
            640,
            750,
            828,
            1080,
            1200,
            1600,
            1920,
        ],

        imageSizes: [
            16,
            32,
            48,
            64,
            96,
            128,
            256,
        ],

        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "Content-Security-Policy-Report-Only", value: cspValue },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
                ],
            },
        ];
    },
};

export default nextConfig;
