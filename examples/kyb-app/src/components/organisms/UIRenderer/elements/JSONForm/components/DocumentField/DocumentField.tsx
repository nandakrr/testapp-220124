import { useStateManagerContext } from '@app/components/organisms/DynamicUI/StateManager/components/StateProvider';
import { useUIElementToolsLogic } from '@app/components/organisms/DynamicUI/hooks/useUIStateLogic/hooks/useUIElementsStateLogic/hooks/useUIElementToolsLogic';
import { Document, UIElement } from '@app/domains/collection-flow';
import { uploadFile } from '@app/domains/storage/storage.api';
import { AnyObject, FileInputAdapter, RJSVInputProps } from '@ballerine/ui';
import { useCallback, useMemo } from 'react';
import set from 'lodash/set';
import get from 'lodash/get';
import { collectionFlowFileStorage } from '@app/pages/CollectionFlow/collection-flow.file-storage';

interface DocumentFieldParams {
  documentData: AnyObject;
  mappingParams: {
    documentIndex: number;
    documentPage: number;
  };
}

export const DocumentField = (
  props: RJSVInputProps & { definition: UIElement<DocumentFieldParams> },
) => {
  const { definition, ...restProps } = props;
  const { formData, onChange } = restProps;
  const { stateApi } = useStateManagerContext();
  const { options } = definition;
  const { documentIndex, documentPage } = options?.mappingParams || {};

  const { toggleElementLoading } = useUIElementToolsLogic(definition.name);

  const inputValue = useMemo(() => {
    if (typeof formData === 'string' && formData) {
      return collectionFlowFileStorage.getFileById(formData) || formData;
    }

    return formData as unknown;
  }, [formData]);

  const handleChange = useCallback(
    async (file: File) => {
      toggleElementLoading();

      const documentPath = `documnents[${documentIndex}]`;

      const context = stateApi.getContext();
      const currentDocumentValue = get(context, documentPath) as Document;
      if (!currentDocumentValue) {
        set(context, documentPath, options.documentData);
      }

      const uploadResult = await uploadFile({ file });

      collectionFlowFileStorage.registerFile(uploadResult.id, file);

      onChange(uploadResult.id);

      toggleElementLoading();
    },
    [stateApi, documentIndex, options, onChange, toggleElementLoading],
  );

  if (documentIndex === undefined || documentPage === undefined) return null;

  return <FileInputAdapter {...restProps} formData={inputValue as File} onChange={handleChange} />;
};
