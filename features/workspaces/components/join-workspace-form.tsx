"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useJoinWorkspace} from "@/features/workspaces/api/use-join-workspace";
import {useInviteCode} from "@/features/workspaces/hooks/use-invite-code";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useRouter} from "next/navigation";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  }
}

export const JoinWorkspaceForm = ({
 initialValues
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const {mutate, isPending} = useJoinWorkspace();

  const onSubmit = () => {
    mutate({
      param: {workspaceId},
      json: {code: inviteCode}
    }, {
      onSuccess: ({data}) => {
        router.push(`/workspaces/${data.$id}`)
      }
    })
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">
          Join a workspace
        </CardTitle>
        <CardDescription>
          You&apos;ve been invited to join a <strong>{initialValues.name}</strong> workspace.
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex gap-2 flex-col lg:flex-row items-center justify-between">
          <Button
            size="lg"
            variant="secondary"
            type="button"
            className="w-full lg:fit"
            asChild
            disabled={isPending}
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            size="lg"
            variant="primary"
            type="button"
            className="w-full lg:fit"
            onClick={onSubmit}
            disabled={isPending}
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}