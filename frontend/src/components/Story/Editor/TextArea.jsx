import React from 'react';
import { Control } from 'react-bulma-components/lib/components/form';

const TextArea = React.forwardRef((props, ref) => {
  const placeholder = 'Type your text here. Remember that only the last line will be visible!';
  return (
    <Control>
      <textarea
        className="textarea"
        rows={3}
        placeholder={placeholder}
        ref={ref}
        name="text"
        style={{ resize: 'none' }}
        required
        data-test="story-textarea"
      />
    </Control>
  );
});

export default TextArea;
