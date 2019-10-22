import React from 'react';
import Table from 'react-bootstrap/Table';
import { textsPropType } from '../../../commonPropTypes';

export default function TextLines({ texts }) {
  return (
    <div className="finished-text-container paper p-2">
      <Table className="table-sm text-viewer-table">
        <tbody>
          {texts.map((text) => (
            <tr key={text.username + text.id}>
              <td
                className="text-muted"
                style={{
                  width: '4em',
                  border: 'none',
                }}
              >
                <p>{`${text.username}:`}</p>
              </td>
              <td style={{ border: 'none' }}>
                <p>{text.fullText}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

TextLines.propTypes = { texts: textsPropType };
TextLines.defaultProps = { texts: null };
