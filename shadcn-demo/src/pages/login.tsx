import { Button } from "../components/ui/button";

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        className=""
        onClick={() => {
          const client_id = '8acc5d74b8c8553b867b';
          const authorize_uri = 'https://github.com/login/oauth/authorize';
          const redirect_uri = 'http://localhost:50001/api/oauth';
          window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
        }}
      >
        使用GitHub进行登录
      </Button>
    </div>
  );
}

export default App;
