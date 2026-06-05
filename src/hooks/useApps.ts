import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface App {
  id: string;
  name: string;
  config: any;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

async function fetchApps(): Promise<App[]> {
  const res = await fetch("/api/apps");
  if (!res.ok) throw new Error("Failed to fetch apps");
  return res.json();
}

async function createApp({
  name,
  config,
}: {
  name: string;
  config: any;
}): Promise<App> {
  const res = await fetch("/api/apps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, config }),
  });
  if (!res.ok) throw new Error("Failed to create app");
  return res.json();
}

async function deleteApp(appId: string): Promise<void> {
  const res = await fetch(`/api/apps/${appId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete app");
}

export function useApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
    staleTime: 60_000,
  });
}

export function useCreateApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });
}

export function useDeleteApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteApp,
    onMutate: async (appId) => {
      await queryClient.cancelQueries({ queryKey: ["apps"] });
      const previous = queryClient.getQueryData<App[]>(["apps"]);
      queryClient.setQueryData<App[]>(["apps"], (old) =>
        old?.filter((a) => a.id !== appId) ?? []
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["apps"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });
}
