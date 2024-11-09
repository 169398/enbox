"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { use } from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: { platform: string };
}
export default function DashboardLayout({ children, params }: LayoutProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const platform = use(params).platform as string;
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  return (
    <div className="container mx-auto py-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/dashboard/${platform}`}>
            {platformName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {children}
    </div>
  );
}
