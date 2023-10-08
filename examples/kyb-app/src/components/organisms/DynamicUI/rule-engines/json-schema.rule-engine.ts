import { RuleEngine } from '@app/components/organisms/DynamicUI/rule-engines/rule-engine.abstract';
import { Rule } from '@app/domains/collection-flow';
import Ajv from 'ajv';

export class JsonSchemaRuleEngine implements RuleEngine {
  public readonly ENGINE_NAME = 'json-schema';

  isActive(context: unknown, rule: Rule): boolean {
    const validator = new Ajv({ allErrors: true });
    const validationResult = validator.validate(rule.value, context);
    if (!validationResult) {
      const validationErrorMessage = validator.errors
        ?.map(error => `${error.instancePath} - ${error.message}`)
        .join(' | ');
      console.warn(validationErrorMessage);
      return false;
    }

    return true;
  }
}