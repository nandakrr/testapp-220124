const availableOnButtonRule = {
  and: [
    { var: 'entity.data' },
    { var: 'entity.data.additionalInfo' },
    { var: 'entity.data.additionalInfo.registeredCapitalInYuan' },
    { var: 'entity.data.businessType' },
    { var: 'entity.data.numberOfEmployees' },
    { var: 'entity.data.taxIdentificationNumber' },
    { var: 'entity.data.companyName' },
    { var: 'entity.data.country' },
    { var: 'entity.data.registrationNumber' },
    // {'===': [ { typeof: { var: 'entity.data.additionalInfo.registeredCapitalInYuan' } }, 'number']},
    // {'>': [ { length: { var: 'entity.data.businessType' } }, 3]},
    // {'===': [ { typeof: { var: 'entity.data.numberOfEmployees' } }, 'number']},
    // {'>': [ { length: { var: 'entity.data.taxIdentificationNumber' } }, 3]},
    // {'>': [ { length: { var: 'entity.data.companyName' } }, 3]},
    {
      and: [
        { '==': [{ length: { var: 'entity.data.country' } }, 2] },
        { '==': [{ var: 'entity.data.country' }, { toUpperCase: { var: 'entity.data.country' } }] },
      ],
    },
    { '>': [{ length: { var: 'entity.data.registrationNumber' } }, 3] },
  ],
};

const dispatchOpenCorporateRule = {
  and: [
    {
      var: 'entity.data.registrationNumber',
    },
    {
      var: 'entity.data.country',
    },
    {
      var: 'entity.data.state',
    },
  ],
};

export const BusinessInfoPage = {
  type: 'page',
  number: 2, // routing number of page
  stateName: 'business_information', // this is the route from xstate
  name: 'Company Information', // page name ( in stepper )
  elements: [
    {
      type: 'mainContainer',
      elements: [
        {
          type: 'collection-flow-head',
        },
        {
          type: 'container',
          elements: [
            {
              type: 'h1',
              value: 'Personal information',
            },
          ],
        },
        {
          type: 'json-form',
          optionss: {
            jsonFormDefinition: {
              required: ['registration-number-input', 'country-picker-input', 'company-name-input'],
            },
          },
          elements: [
            {
              name: 'registration-number-input',
              type: 'json-form:text',
              valueDestination: 'entity.data.registrationNumber',
              options: {
                label: 'Registration Number',
                hint: '1000000032985',
                jsonFormDefinition: {
                  type: 'string',
                },
              },
            },
            {
              name: 'country-picker-input',
              type: 'country-picker',
              valueDestination: 'entity.data.country',
              options: {
                hint: 'Hong Kong',
                jsonFormDefinition: {
                  type: 'string',
                },
              },
            },
            {
              name: 'state-input',
              type: 'state',
              valueDestination: 'entity.data.state',
              options: {
                hint: 'State',
                jsonFormDefinition: {
                  type: 'string',
                },
              },
            },
            {
              name: 'company-name-input',
              type: 'json-form:text',
              valueDestination: 'entity.data.companyName',
              options: {
                label: 'Company English Name',
                hint: 'English Name',
                jsonFormDefinition: {
                  type: 'string',
                },
              },
            },
            {
              name: 'tax-identification-number-input',
              type: 'json-form:text',
              valueDestination: 'entity.data.taxIdentificationNumber',
              options: {
                label: 'Tax Identity Number',
                hint: '1234567898765',
                jsonFormDefinition: {
                  type: 'string',
                },
              },
            },
            {
              name: 'number-of-employees-input',
              type: 'json-form:text',
              valueDestination: 'entity.data.numberOfEmployees',
              options: {
                jsonFormDefinition: {
                  type: 'number',
                },
                hint: '20',
                label: 'Amount of Employees',
              },
            },
            {
              name: 'business-type-input',
              type: 'json-form:dropdown',
              valueDestination: 'entity.data.businessType',
              options: {
                hint: 'Corporation',
                label: 'Corporate type',
                jsonFormDefinition: {
                  type: 'string',
                },
                optionss: [
                  { label: 'Corporation', value: 'corporation' },
                  { label: 'Limited Liability Company', value: 'limited_liability_company' },
                  { label: 'Partnership', value: 'partnership' },
                  { label: 'Sole Proprietorship', value: 'sole_proprietorship' },
                  { label: 'Non-Profit', value: 'non_profit' },
                  { label: 'Government', value: 'government' },
                  { label: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'registered-capital-in-yuan-type-input',
              type: 'json-form:text',
              valueDestination: 'entity.data.additionalInfo.registeredCapitalInYuan',
              options: {
                jsonFormDefinition: {
                  type: 'number',
                },
                format: 'currency',
                hint: '2,000,000',
                label: 'Registered capital (in Chinese Yuan)',
              },
            },
          ],
        },
        {
          name: 'next-page-button',
          type: 'button',
          uiDefinition: {
            classNames: ['align-right', 'padding-top-10'],
          },
          availableOn: [
            {
              type: 'json-logic',
              value: availableOnButtonRule,
            },
          ],
          options: {
            text: 'Continue',
          },
        },
      ],
    },
  ],
  actions: [
    {
      type: 'definitionPlugin',
      params: {pluginName: 'fetch_company_information'},
      dispatchOn: {
        uiEvents: [
          { event: 'onChange', uiElementName: 'registration-number-input' },
          { event: 'onChange', uiElementName: 'country-picker-input' },
        ],
        rules: [
          {
            type: 'json-logic',
            value: dispatchOpenCorporateRule,
          },
        ],
      },
    },
    {
      type: 'definitionEvent',
      event: 'NEXT',
      dispatchOn: {
        uiEvents: [{ event: 'onClick', uiElementName: 'next-page-button' }],
        rules: [
          {
            type: 'json-logic',
            value: availableOnButtonRule,
          },
        ],
      },
    },
  ],
};