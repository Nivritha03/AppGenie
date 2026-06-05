import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface AppRecord {
  id: string;
  appId: string;
  entityName: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// Fetch all records for an app
async function fetchRecords(appId: string): Promise<AppRecord[]> {
  const res = await fetch(`/api/apps/${appId}/records`);
  if (!res.ok) throw new Error("Failed to fetch records");
  return res.json();
}

// Create a new record
async function createRecord({
  appId,
  data,
  entityName,
}: {
  appId: string;
  data: Record<string, unknown>;
  entityName: string;
}): Promise<AppRecord> {
  const res = await fetch(`/api/apps/${appId}/records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, entityName }),
  });
  if (!res.ok) throw new Error("Failed to create record");
  return res.json();
}

// Delete a record
async function deleteRecord({
  appId,
  recordId,
}: {
  appId: string;
  recordId: string;
}): Promise<void> {
  const res = await fetch(`/api/apps/${appId}/records/${recordId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete record");
}

// Hook: use all records for an app
export function useRecords(appId: string) {
  return useQuery({
    queryKey: ["records", appId],
    queryFn: () => fetchRecords(appId),
    enabled: !!appId,
    staleTime: 30_000, // 30 seconds
  });
}

// Hook: create a record with optimistic cache update
export function useCreateRecord(appId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records", appId] });
    },
  });
}

// Hook: delete a record with optimistic cache update
export function useDeleteRecord(appId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecord,
    onMutate: async ({ recordId }) => {
      await queryClient.cancelQueries({ queryKey: ["records", appId] });
      const previous = queryClient.getQueryData<AppRecord[]>(["records", appId]);
      queryClient.setQueryData<AppRecord[]>(["records", appId], (old) =>
        old?.filter((r) => r.id !== recordId) ?? []
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["records", appId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["records", appId] });
    },
  });
}
