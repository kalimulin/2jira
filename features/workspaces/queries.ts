import {Query} from "node-appwrite";

import {DATABASE_ID, MEMBERS_ID, WORKSPACES_ID} from "@/config";
import {createSessionClient} from "@/lib/appwrite";
import {getMember} from "@/features/members/utils";
import {Workspace} from "@/features/workspaces/types";

export const getWorkspaces = async () => {
  const { databases, account } = await createSessionClient();

  const user = await account.get();

  const members = await databases.listDocuments(
    DATABASE_ID,
    MEMBERS_ID,
    [Query.equal("userId", user.$id)]
  );

  if (members.total === 0) {
    return { documents: [], total: 0 };
  }

  const workspaceIds = members.documents.map((member) => member.workspaceId);

  return await databases.listDocuments(
    DATABASE_ID,
    WORKSPACES_ID,
    [
      Query.orderDesc("$createdAt"),
      Query.contains("$id", workspaceIds)
    ],
  );
}

interface GetWorkspaceProps {
  workspaceId: string
}

export const getWorkspace = async ({workspaceId} : GetWorkspaceProps) => {
  const { databases, account } = await createSessionClient();
  const user = await account.get()

  const member = await getMember({
    databases,
    userId: user.$id,
    workspaceId
  })

  if (!member) {
    throw new Error("Unauthorized");
  }

  return await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACES_ID,
    workspaceId
  )
}

interface GetWorkspaceInfoProps {
  workspaceId: string
}

export const getWorkspaceInfo = async ({
  workspaceId
} : GetWorkspaceInfoProps) => {
  try {
    const { databases } = await createSessionClient();

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    )

    return {
      name: workspace.name
    }
  } catch {
    return null;
  }
}