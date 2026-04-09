import type { ReactNode } from "react";
import { listAllProgramIds } from "@/lib/mock-match";

export function generateStaticParams() {
  return listAllProgramIds().map((programId) => ({ programId }));
}

export default function WriteProgramLayout({ children }: { children: ReactNode }) {
  return children;
}
