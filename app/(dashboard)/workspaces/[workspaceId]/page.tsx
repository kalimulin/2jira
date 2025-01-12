'use client';

import {useParams} from "next/navigation";

const WorkspaceIdPage = () => {
  const params = useParams();
  const workspaceId = params.workspaceId;

  return (
    <div>
      Workspace Id: {workspaceId}
    </div>
  )
}

export default WorkspaceIdPage;