import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import axios from "axios";

function App() {
  const select = useRef("apple");
  const [id, setId] = useState(-1);
  useEffect(() => {
    axios.get('/api/testToken').then(({data})=>{
      if(data.code===1){
        setId(data.id)
      } else {
        window.location.hash = '/'
      }
    })
  }, [])
  
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {id === -1 ? (
        <RenderCompent />
      ) : (
        <>
          <div className="mb-6">{`欢迎id为${id}的用户进入网页，请您完成信息采集`}</div>
          <div className="w-[450px] border-2 p-8 bg-slate-50 flex flex-row items-center">
            <Select
              defaultValue="apple"
              onValueChange={(value) => {
                select.current = value;
              }}
            >
              <SelectTrigger className="w-[260px] border-black">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              className=" ml-3"
              onClick={() => {
                alert(select.current);
              }}
            >
              弹出结果
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function RenderCompent() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-l-2 border-black"></div>
    </div>
  );
}

export default App;
