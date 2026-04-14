import FormUpdateEmployee from "@/components/molecules/form/employee/FormUpdateEmployee";

interface DashboardAdminEmployeeUpdateWrapperProps {
  id: string;
}

export default function DashboardAdminEmployeeUpdateWrapper({
  id,
}: DashboardAdminEmployeeUpdateWrapperProps) {
  return (
    <section>
      <FormUpdateEmployee employeeId={id} />
    </section>
  );
}
