import { AppShell } from '@app/components/layouts/AppShell';
import { useViewState } from '@app/common/providers/ViewStateProvider';
import { WorkflowFlowData } from '@app/domains/workflows/flow-data.type';
import { BankInformationContext } from './types';
import { bankInformationSchema } from '@app/components/organisms/KYBView/views/BankInformationView/bank-information.schema';
import { bankInformationUISchema } from '@app/components/organisms/KYBView/views/BankInformationView/bank-information.ui-schema';
import { DynamicForm } from '@ballerine/ui';
import { ViewHeader } from '@app/components/organisms/KYBView/components/ViewHeader';

export const BankInformationView = () => {
  const { context, saveAndPerformTransition } = useViewState<WorkflowFlowData>();

  return (
    <AppShell.FormContainer header={<ViewHeader />}>
      <DynamicForm<BankInformationContext>
        className="max-w-[384px]"
        formData={context.flowData.bank}
        schema={bankInformationSchema}
        uiSchema={bankInformationUISchema}
        onSubmit={values => void saveAndPerformTransition(values)}
      />
    </AppShell.FormContainer>
  );
};