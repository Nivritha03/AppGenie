/**
 * workflows.ts
 * Handles server-side workflow execution logic.
 * Triggered after record creation events.
 */

import { prisma } from "@/lib/prisma";

export type WorkflowTrigger = "RECORD_CREATED" | "RECORD_DELETED" | "RECORD_UPDATED";
export type WorkflowAction = "SEND_NOTIFICATION" | "SEND_EMAIL" | "WEBHOOK";

export interface WorkflowPayload {
  appId: string;
  appName: string;
  userId: string;
  trigger: WorkflowTrigger;
  entityName: string;
  data: Record<string, any>;
}

/**
 * Executes all workflows for a given trigger event.
 * Currently supports: SEND_NOTIFICATION
 */
export async function executeWorkflows(payload: WorkflowPayload): Promise<void> {
  const workflows = await prisma.workflow.findMany({
    where: {
      appId: payload.appId,
      trigger: payload.trigger,
    },
  });

  for (const workflow of workflows) {
    try {
      await executeAction(workflow.action as WorkflowAction, payload);
    } catch (err) {
      console.error(`Workflow execution failed [${workflow.id}]:`, err);
    }
  }
}

async function executeAction(
  action: WorkflowAction,
  payload: WorkflowPayload
): Promise<void> {
  switch (action) {
    case "SEND_NOTIFICATION":
      await prisma.notification.create({
        data: {
          message: `New record created in "${payload.appName}" (${payload.entityName})`,
          userId: payload.userId,
        },
      });
      break;

    case "SEND_EMAIL":
      // Placeholder: integrate with Resend or SendGrid
      console.log(`[Workflow] SEND_EMAIL triggered for app: ${payload.appName}`);
      break;

    case "WEBHOOK":
      // Placeholder: integrate with external webhook URL
      console.log(`[Workflow] WEBHOOK triggered for app: ${payload.appName}`);
      break;

    default:
      console.warn(`[Workflow] Unknown action: ${action}`);
  }
}
