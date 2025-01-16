import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {getWorkspaceInfo} from "@/features/workspaces/queries";
import {JoinWorkspaceForm} from "@/features/workspaces/components/join-workspace-form";

interface WorkspaceIdJoinPagProps {
  params: {
    workspaceId: string
  }
}

const WorkspaceIdJoinPage = async ({
  params
}: WorkspaceIdJoinPagProps) => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in')

  const workspace = await getWorkspaceInfo({
    workspaceId: params.workspaceId
  })

  if (!workspace) redirect('/')

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={workspace} />
    </div>
  )
}

export default WorkspaceIdJoinPage;