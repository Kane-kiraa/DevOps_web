import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  
  // ត្រូវដាក់ឈ្មោះ Repository របស់អ្នក (មានសញ្ញា / ពីមុខ)
  // ដើម្បីកុំឱ្យ Next.js វង្វេងផ្លូវពេលទាញយកឯកសារ CSS/JS មកបង្ហាញ
  basePath: '/DevOps_web', 
  
  images: {
    unoptimized: true,
  },
};

export default nextConfig;