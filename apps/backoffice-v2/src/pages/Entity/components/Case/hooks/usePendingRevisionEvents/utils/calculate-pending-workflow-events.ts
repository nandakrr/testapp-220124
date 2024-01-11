import { TWorkflowById } from '@/domains/workflows/fetchers';
import { StateTag, TDocument } from '@ballerine/common';
import { calculateWorkflowRevisionableEvent } from '@/pages/Entity/components/Case/hooks/usePendingRevisionEvents/utils/calculate-workflow-revisionable-event';
import { IPendingEvent } from '@/pages/Entity/components/Case/hooks/usePendingRevisionEvents/interfaces';

export const calculatePendingWorkflowEvents = (workflow: TWorkflowById): Array<IPendingEvent> => {
  return [
    ...workflow.context.documents,
    ...(workflow.context.entity?.additionalInfo?.directors?.map(
      (director: { documents: Array<TDocument> }) => director.documents,
    ) || []),
  ]
    .flat()
    .filter(
      document => !!document.decision?.status && workflow?.tags?.includes(StateTag.MANUAL_REVIEW),
    )
    .map(document => {
      return {
        workflowId: workflow.id,
        documentId: document.id as string,
        eventName: calculateWorkflowRevisionableEvent(workflow, document.decision?.status),
        token: workflow?.context?.metadata?.token,
      };
    })
    .filter((a): a is NonNullable<IPendingEvent> => !!a && !!a.eventName);
};

export const calculateAllWorkflowPendingEvents = (
  workflow: TWorkflowById,
): Array<IPendingEvent> => {
  return [
    ...calculatePendingWorkflowEvents(workflow),
    ...(workflow.childWorkflows?.flatMap(childWorkflow =>
      calculateAllWorkflowPendingEvents(childWorkflow),
    ) || []),
  ].flat();
};