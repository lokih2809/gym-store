"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FullscreenLoading from "@/components/common/FullScreenLoading";

export default function RouteChangeLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? <FullscreenLoading /> : null;
}
