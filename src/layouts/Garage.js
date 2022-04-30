import MenuGarage from "../components/menus/MenuGarage";
import styled from 'styled-components';

const Page = styled.div`
  flex: 16;
  margin-top: 5rem;
  @media (max-width: 768px) {
    flex: 5;
    margin-top: 5rem;
  }
`;

const User = ({ children }) => {
  return (
      <div className="flex overflow-x-hidden max-w-screen w-screen h-screen bg-gradient-to-br from-blue-700 via-teal-700 to-teal-900">
        <div className="flex-1">
          <MenuGarage className="z-40"/>
        </div>
        <Page className="h-screen">
          {children}
        </Page>
      </div>
  )
}

export default User