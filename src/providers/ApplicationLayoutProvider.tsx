import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react';

interface ApplicationLayoutContextInterface {
  contentClass: string;
  setContentClass: Dispatch<SetStateAction<string>>;
  footerClass: string;
  setFooterClass: Dispatch<SetStateAction<string>>;
}

export const ApplicationLayoutContext = createContext(
  {} as ApplicationLayoutContextInterface
);

const ApplicationLayoutProvider = ({ children }: PropsWithChildren) => {
  const [contentClass, setContentClass] = useState('');
  const [footerClass, setFooterClass] = useState('');
  return (
    <ApplicationLayoutContext.Provider
      value={{ contentClass, setContentClass, footerClass, setFooterClass }}
    >
      {children}
    </ApplicationLayoutContext.Provider>
  );
};

export const useApplicationLayoutContext = () =>
  useContext(ApplicationLayoutContext);

export default ApplicationLayoutProvider;
