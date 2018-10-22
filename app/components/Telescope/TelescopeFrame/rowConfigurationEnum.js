import { Enum } from 'enumify';

class RowConfiguration extends Enum {}
RowConfiguration.initEnum(['LEFT', 'RIGHT', 'BOTTOM', 'TOP']);

export default RowConfiguration;
