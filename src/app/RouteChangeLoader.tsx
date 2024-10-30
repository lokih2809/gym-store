// components/RouteChangeLoader.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FullscreenLoading from "@/components/common/FullScreenLoading";

export default function RouteChangeLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Khi pathname thay đổi, kích hoạt loading
    setLoading(true);

    // Giả lập thời gian load hoàn tất
    const timer = setTimeout(() => setLoading(false), 500);

    // Cleanup timer khi component unmount hoặc pathname thay đổi
    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? <FullscreenLoading /> : null;
}
