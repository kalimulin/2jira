import {InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.login['$post']>;

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter()

  return useMutation<
    ResponseType,
    Error
  >({
    mutationFn: async () => {
      const response = await client.api.auth.logout['$post']();
      return await response.json();
    },
    onSuccess: () => {
      router.refresh()
      queryClient.invalidateQueries({queryKey: ['current']})
    }
  });
}