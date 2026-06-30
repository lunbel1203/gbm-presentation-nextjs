import * as React from 'react';
import { useField } from '@strapi/strapi/admin';
import { Field, Flex, TextInput, Button } from '@strapi/design-system';

/**
 * Input de solo lectura con botón "Copiar" para el campo accessUrl.
 * El valor lo gestiona el lifecycle del content-type; aquí no se edita.
 */
const CopyableUrlInput = React.forwardRef((props, ref) => {
  const { name, required = false, label, hint, labelAction } = props;
  const field = useField(name);
  const value = field.value || '';
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // ignore
    }
  };

  return (
    <Field.Root name={name} id={name} error={field.error} hint={hint} required={required}>
      <Field.Label action={labelAction}>{label}</Field.Label>
      <Flex gap={2} alignItems="flex-end">
        <TextInput
          ref={ref}
          name={name}
          aria-label={label}
          value={value}
          disabled
        />
        <Button variant="secondary" onClick={handleCopy} disabled={!value}>
          {copied ? 'Copiado ✓' : 'Copiar'}
        </Button>
      </Flex>
      <Field.Hint />
      <Field.Error />
    </Field.Root>
  );
});

export default CopyableUrlInput;
