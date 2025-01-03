import { Session } from "@/app/types/auth";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ScaleLoader } from "react-spinners";

export default async function Redirect() {
  const session: Session | null = await getServerSession(authOptions);
  const token = session?.user?.data;
  if (token) {
    redirect("/all-roles");
  }
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <ScaleLoader color="#1FAB89" />
    </div>
  );
}