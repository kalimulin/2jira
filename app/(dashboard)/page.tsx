import {redirect} from "next/navigation";

import {getCurrent} from "@/features/auth/queries";
import {getWorkspaces} from "@/features/workspaces/queries";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in")

  const workspaces = await getWorkspaces();

  const redirectPath = workspaces.total === 0
    ? 'create' : workspaces.documents[0].$id
  redirect(`/workspaces/${redirectPath}`)
}
