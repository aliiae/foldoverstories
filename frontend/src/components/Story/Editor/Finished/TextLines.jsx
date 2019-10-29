import React from 'react';
import Table from 'react-bulma-components/lib/components/table';
import { textsPropType } from '../../../commonPropTypes';

export default function TextLines({ texts }) {
  return (
    <div className="finished-text-container paper">
      <Table className="text-viewer-table" striped={false}>
        <tbody>
          {texts.map((text) => (
            <tr key={text.username + text.id}>
              <td className="has-text-grey td-username">
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
