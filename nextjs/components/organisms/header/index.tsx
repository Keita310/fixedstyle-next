import Presenter from './presenter'
import { PropsTypes } from 'types/header'

const Container = ({description}: PropsTypes) => {
  return (
    <Presenter
      description={description}
    />
  );
};

export default Container