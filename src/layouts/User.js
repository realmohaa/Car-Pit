import Menu from "../components/menus/Menu";
import styled from 'styled-components';

const Container = styled.div`
overflow: hidden
`;

const MainMenu = styled.div`
  flex: 1;
`;

const Page = styled.div`
  flex: 13;
  margin-top: 3rem;
  @media (max-width: 768px) {
    flex: 5;
    margin-top: 5rem;
  }
`;

const User = ({ children }) => {
  return (
      <Container className="flex max-w-screen w-screen h-screen bg-gradient-to-br from-blue-700 via-teal-700 to-teal-900">
        <MainMenu>
          <Menu className="z-40"/>
        </MainMenu>
        <Page className="w-screen h-screen">
          {children}
        </Page>
      </Container>
  )
}

export default User