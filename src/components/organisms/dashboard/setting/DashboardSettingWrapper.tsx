import FormChangePassword from "@/components/molecules/form/setting/FormChangePassword";
import FormUpdateProfile from "@/components/molecules/form/setting/FormUpdateProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardSettingWrapper() {
  return (
    <section>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Pengaturan Profil</TabsTrigger>
          <TabsTrigger value="password">Ganti Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <FormUpdateProfile />
        </TabsContent>
        <TabsContent value="password">
          <FormChangePassword />
        </TabsContent>
      </Tabs>
    </section>
  );
}
