import { TWorkflowDefinition } from '@/domains/workflows/fetchers';
import { useCreateWorkflowMutation } from '@/domains/workflows/hooks/mutations/useCreateWorkflowMutation/useCreateWorkflowMutation';
import { prepareContext } from '@/pages/Entities/components/CaseGeneration/components/CaseGenerationForm/hooks/useCaseGenerationForm/utils/prepare-context';
import { useCaseGenerationContext } from '@/pages/Entities/components/CaseGeneration/context/case-generation-context/hooks/useCaseGenerationContext';
import { AnyObject } from '@ballerine/ui';
import { useCallback } from 'react';

export const useCaseGenerationForm = (workflowDefinition: TWorkflowDefinition) => {
  const { isLoading, mutateAsync } = useCreateWorkflowMutation();
  const { isMultipleCasesCreation, setOpen } = useCaseGenerationContext();

  const handleSubmit = useCallback(
    async (formData: AnyObject) => {
      const context = prepareContext(formData);

      await mutateAsync({ workflowDefinitionId: workflowDefinition.id, context });

      if (!isMultipleCasesCreation) {
        setOpen(false);
      }
    },
    [workflowDefinition, isMultipleCasesCreation, mutateAsync, setOpen],
  );

  return {
    isLoading,
    handleSubmit,
  };
};
