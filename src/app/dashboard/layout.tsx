import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarWrapper } from "@/components/organisms/sidebar/SidebarWrapper";
import BreadcrumbNav from "@/components/atoms/breadcrumb/BreadcrumbNav";
import { BreadcrumbProvider } from "@/components/atoms/breadcrumb/breadcrumb-context";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  return (
    <SidebarProvider>
      <SidebarWrapper session={session!} />

      <SidebarInset className="min-w-0 overflow-x-hidden">
        <BreadcrumbProvider>
          <header className="sticky top-0 z-30 w-full border-b bg-background overflow-x-hidden">
            <div className="flex min-h-[44px] items-center gap-2 px-4 min-w-0">
              <SidebarTrigger className="shrink-0" />

              <div className="min-w-0 flex-1 overflow-hidden">
                <BreadcrumbNav />
              </div>
            </div>
          </header>

          <main className="min-w-0 px-5 py-6 overflow-x-hidden">
            {children}
          </main>
        </BreadcrumbProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
