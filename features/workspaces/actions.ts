import {Account, Client, Databases, Query} from "node-appwrite";
import {cookies} from "next/headers"

import {AUTH_COOKIE} from "@/features/auth/constants";
import {DATABASE_ID, MEMBERS_ID, WORKSPACES_ID} from "@/config";
import {getMember} from "@/features/members/utils";
import {Workspace} from "@/features/workspaces/types";

interface GetWorkspaceProps {
  workspaceId: string
}

export const getWorkspace = async ({workspaceId} : GetWorkspaceProps) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = await cookies().get(AUTH_COOKIE)

    if (!session) return null;

    client.setSession(session.value)
    const databases = new Databases(client);
    const account = new Account(client);
    const user = await account.get()

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId
    })

    if (!member) {
      return null;
    }

    return await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    )
  } catch {
    return null;
  }
}

export const getWorkspaces = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = await cookies().get(AUTH_COOKIE)

    if (!session) return {documents: [], total: 0};

    client.setSession(session.value)
    const databases = new Databases(client);
    const account = new Account(client);
    const user = await account.get()

    const members = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_ID,
      [Query.equal('userId', user.$id)]
    )

    if (members.total === 0) {
      return {documents: [], total: 0}
    }

    const workspacesIds = members.documents.map((member) => member.workspaceId);

    return await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [
        Query.orderDesc('$createdAt'),
        Query.contains('$id', workspacesIds)
      ]
    )
  } catch {
    return {documents: [], total: 0};
  }
}