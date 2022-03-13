import * as renderer from 'react-test-renderer';
import Presenter from './presenter';

it ('スナップショットテスト', () => {
  const description = "ピストバイク初心者 パーツやトリック、カスタムのことなら【Fixed Style】";
  const tree = renderer.create(<Presenter description={description} />).toJSON();
  expect(tree).toMatchSnapshot();
});