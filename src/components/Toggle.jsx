import React from 'react';
import { Form } from 'react-bootstrap';

export default function Toggle({ onChange, label, value }) {
  return (
    <>
      <li>
        <Form.Check onChange={onChange} type="switch" label={label} checked={value} />
      </li>
    </>
  );
}
