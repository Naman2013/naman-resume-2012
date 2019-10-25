import * as React from 'react';
import { ILeaderboardItem } from 'app/modules/leaderboard/types';
import { Table } from 'react-bootstrap';
import * as cx from 'classnames';

interface LeaderboardTableProps {
  tableData: ILeaderboardItem[];
  header: string;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = React.memo(
  (props: LeaderboardTableProps) => {
    const { header, tableData = [], highlightCID } = props;

    return (
      <>
        <h3 className="text-center">{header}</h3>
        <Table responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Gravity</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(el => (
              <tr
                className={cx({
                  'table-active': highlightCID === el.CustomerUUID,
                })}
              >
                <td>{el.Ranking}</td>
                <td>{el.DISPLAYNAME}</td>
                <td>{el.Gravity}</td>
                <td>{el.Tier}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
);
