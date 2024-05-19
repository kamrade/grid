import { RuleVeto, RuleVetoFields } from '../data/rule-veto.types';
import { ISortedBy } from '../grid.types';
import { cloneDeep } from 'lodash';

// TODO: implementation
// Here is the place where data should be - sorted, filtered, paginated, calculate statistic
export const prepareData = (data: RuleVeto[], sortedBy: ISortedBy) => {
  let newData =  data.sort((a: RuleVeto, b: RuleVeto) => {

    const fieldA: string = String(a[sortedBy.column as RuleVetoFields]).toLowerCase();
    const fieldB: string = String(b[sortedBy.column as RuleVetoFields]).toLowerCase();

    if (fieldA < fieldB) {
      return sortedBy.direction === 'acc' ? 1 : -1;
    }
    if (fieldA > fieldB) {
      return sortedBy.direction === 'acc' ? -1 : 1;
    }
    return 0;

  });

  return cloneDeep(newData);
}
