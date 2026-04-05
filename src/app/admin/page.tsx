"use client";

import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    (async () => {
      const CMS = (await import("decap-cms-app")).default;
      CMS.init();
    })();
  }, []);

  return <div id="nc-root" />;
}
